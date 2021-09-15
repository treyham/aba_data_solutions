import { context } from '@app/api'
import { config } from '@app/config' // must be after import from @app/api
import fastify from 'fastify'
import { plugins } from './service'
// import closeWithGrace from 'close-with-grace'
declare module 'mercurius' {}

async function main() {
  const server = fastify({ logger: !config.env.isProd})
  // register plugins
  await server.register(plugins)
  // old stuff moved to
  // packages/server/src/plugins/db/schema/index.ts
  // packages/server/src/plugins/auth/index.ts   
  // add hooks
  server.addHook('preHandler', (request, reply, next) => {
    console.log("HOOK", "sessionId: ", request.session.sessionId, "\nencryptedSessionId: ", request.session.encryptedSessionId)
  })
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

main()
  // https://github.com/fastify/middie
  .then(server => server.listen(config.env.serverPort as string, () => {
    console.log(`
    🚀 Dev Server ready at: http://localhost:${config.env.serverPort}/altair
    ⭐️ You rock!
    `)
  }))                                                       
  .catch(console.error)
  .finally(async () => {
    await context.prisma.$disconnect()
    console.log("Disconnecting...") 
  })

/**
 * If the above script runs multiple times in the context of a long-
 * running application without calling ```$disconnect()```, a new
 * connection pool is created with each new instance of
 * ```{ PrismaClient }```.
 */
// watch ben's vid on how to do the ts compile stuff