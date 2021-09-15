import AltairFastify from 'altair-fastify-plugin'
import cookie, { FastifyCookieOptions } from 'fastify-cookie'
import fastifySession from 'fastify-session'
import fastify from 'fastify'
import mercurius, {
  IFieldResolver,
  IResolvers,
  MercuriusContext,
} from 'mercurius'
import appService from './appService'
import { context, schema,  } from '@app/api'
import { config } from '@app/config'                      // must be after import from @app/api

declare module 'mercurius' { }

async function main() {
  const server = fastify({ logger: !config.isProd})
  //console.log('server: ', server)
  
  // register plugins
  await server.register(appService)
  await server.register(mercurius, {
    schema,
    graphiql: false,
    ide: false,
    path: '/graphql',
    context: () => (context)                              // provide the prisma instance to the context
  })
  // See sample queries: http://pris.ly/e/ts/graphql-fastify-sdl-first#using-the-graphql-api  
  await server.register(AltairFastify, {
    path: '/altair',
    baseURL: '/altair/',
    endpointURL: '/graphql'                               // should be the same as the mercurius 'path'
  })
  await server.register(fastifySession, {
    secret: config.sessionSecret.split(','),             // allows comma delim string of secrets
    saveUninitialized: false
  })
  await server.register(cookie, {
    secret: config.cookieSecret,                         // for cookies signature
    parseOptions: {
      httpOnly: true
    }                                                     // options for parsing cookies
  } as FastifyCookieOptions)
  // add hooks
  server.addHook('preHandler', (request, reply, next) => {
    console.log("HOOK", "sessionId: ", request.session.sessionId, "\nencryptedSessionId: ", request.session.encryptedSessionId)

  })

  //if (config.node_dev) fastify.log.info()
  return server

}
/**
 * If the below script runs multiple times in the context of a long-
 * running application without calling ```$disconnect()```, a new
 * connection pool is created with each new instance of
 * ```{ PrismaClient }```.
 */
main()
  // https://github.com/fastify/middie
  .then(server => server.listen(config.serverPort as string, () => {
    console.log(`
    🚀 Dev Server ready at: http://localhost:${config.serverPort}/altair
    ⭐️ You rock!
    `)
  }))                                                       
  .catch(console.error)
  .finally(async () => {
    await context.prisma.$disconnect()
    console.log("Disconnecting...") 
  })


// watch ben's vid on how to do the ts compile stuff