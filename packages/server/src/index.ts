import fastify from 'fastify'
import mercurius, {
  IFieldResolver,
  IResolvers,
  MercuriusContext,
} from 'mercurius'
import { schema } from './shema.js'
import { context } from './context.js'
import AltairFastify from 'altair-fastify-plugin'
declare module 'mercurius' { }

async function main() {
  const server = fastify()
  const dbPort = 3001
  const __prod__ = false
  console.log(`Dev: ${!__prod__}`)
  server.register(mercurius, {
    schema,
    graphiql: false,
    ide: false,
    path: '/graphql',
    context: () => (context)                             // provide the prisma instance to the context
  })

  server.register(AltairFastify, {
    path: '/altair',
    baseURL: '/altair/',
    endpointURL: '/graphql'                              // should be the same as the mercurius 'path'
  })
  
  server.listen(dbPort, () => {
    console.log(`
    🚀 Server ready at: http://localhost:${dbPort}/graphiql
    ⭐️ See sample queries: http://pris.ly/e/ts/graphql-fastify-sdl-first#using-the-graphql-api
    `)
  })
}
/**
 * If the below script runs multiple times in the context of a long-
 * running application without calling ```$disconnect()```, a new
 * connection pool is created with each new instance of
 * ```{ PrismaClient }```.
 */
main()
.catch(console.error)
.finally(async () => {
  await context.prisma.$disconnect()
  console.log("Disconnecting...")
})


// watch ben's vid on how to do the ts compile stuff
// right now if it breaks when you save just save again