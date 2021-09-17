import FastifyInstance from './plugins/misc/index'
import { context } from '@app/api'
import { config } from '@app/config' // must be after import from @app/api
import fastify, { FastifyLoggerInstance } from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'http'
import { plugins } from './service'
// import closeWithGrace from 'close-with-grace'
declare module 'mercurius' {}

// TODO FastifyInstance https://medium.com/sharenowtech/fastify-with-typescript-production-ready-integration-2303318ecd9e

// FastifyInstance<>
// const server: fastify.FastifyInstance<
//   Server,
//   IncomingMessage,
//   ServerResponse,
//   FastifyLoggerInstance
// > = fastify(logger: !config.env.isProd)

const server = fastify()

async function start() {
  // register plugins
  await server.register(plugins)
  // old stuff moved to
  // packages/server/src/plugins/db/schema/index.ts
  // packages/server/src/plugins/auth/index.ts
  // add hooks
  server.addHook('preHandler', (request, reply, next) => {
    console.log(
      'HOOK',
      'sessionId: ',
      request.session.sessionId,
      '\nencryptedSessionId: ',
      request.session.encryptedSessionId
    )
  })
  // TODO close with grace onClose hook
  // const closeListeners = closeWithGrace({ delay: 500 }, async ({ err:  }) => {
  //   if (err) {
  //     server.log.error(err)
  //   }
  //   await server.close()
  // })
  // server.addHook('onClose', async (instance, done) => {
  //   closeListeners.uninstall()
  //   done()
  // })
  return server
}

// TODO server error catching
//  server.on("uncaughtException", error => {
//   console.error(error);
// })
// server.on("unhandledRejection", error => {
//   console.error(error);
// })

start()
  // https://github.com/fastify/middie
  .then(server =>
    server.listen(config.env.serverPort as string, () => {
      console.log(`
    🚀 Dev Server ready at: http://localhost:${config.env.serverPort}/altair
    ⭐️ You rock!
    `)
    })
  )
  .catch(console.error)
  .finally(async () => {
    await context.prisma.$disconnect()
    console.log('Disconnecting...')
  })

/**
 * If the above script runs multiple times in the context of a long-
 * running application without calling ```$disconnect()```, a new
 * connection pool is created with each new instance of
 * ```{ PrismaClient }```.
 */
// watch ben's vid on how to do the ts compile stuff