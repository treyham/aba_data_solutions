import AltairFastify from 'altair-fastify-plugin'
import fastify from 'fastify'
import mercurius, {
  IFieldResolver,
  IResolvers,
  MercuriusContext,
} from 'mercurius'
import { schema, context,  } from '@app/api'
import { config } from '@app/config'                      // must be after import from @app/api

declare module 'mercurius' { }


async function main() {
  const server = fastify({ logger: !config.node_dev})

  if (!config.node_dev) () => {
    console.log('uhhhh, Improvise!!')
  }
  // await server.register(require('middie'))
  await server.register(mercurius, {
    schema,
    graphiql: false,
    ide: false,
    path: '/graphql',
    context: () => (context)                             // provide the prisma instance to the context
  })
  await server.register(AltairFastify, {
    path: '/altair',
    baseURL: '/altair/',
    endpointURL: '/graphql'                              // should be the same as the mercurius 'path'
  })
  return server
// See sample queries: http://pris.ly/e/ts/graphql-fastify-sdl-first#using-the-graphql-api  
}
/**
 * If the below script runs multiple times in the context of a long-
 * running application without calling ```$disconnect()```, a new
 * connection pool is created with each new instance of
 * ```{ PrismaClient }```.
 */
main()
  // https://github.com/fastify/middie
  .then(server => server.listen(config.server_port as string, () => {
    console.log(`
    🚀 Dev Server ready at: http://localhost:${config.server_port}/altair
    ⭐️ You rock!
    `)
  }))                                                       
  .catch(console.error)
  .finally(async () => {
    await context.prisma.$disconnect()
    console.log("Disconnecting...") 
  })


// watch ben's vid on how to do the ts compile stuff
// right now if it breaks when you save just save again