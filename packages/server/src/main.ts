import { context } from '@app/api'
import { config } from '@app/config'                                           // must be after import from @app/api
import fastify from 'fastify'
import { plugins } from './service'
// import closeWithGrace from 'close-with-grace'
declare module 'mercurius' {}

// TODO FastifyInstance
// https://www.fastify.io/docs/latest/TypeScript/#plugins
// https://medium.com/sharenowtech/fastify-with-typescript-production-ready-integration-2303318ecd9e

const server = fastify()

async function start() {
  // register plugins
  await server.register(plugins)
  // add hooks
  // TODO fix any's
  server.addHook('preHandler', (request: any, reply: any) => {
    console.log(
      'HOOK',
      'sessionId: ',
      request.session.sessionId,
      '\nencryptedSessionId: ',
      request.session.encryptedSessionId
    )
  })
  // TODO close with grace onClose hook (broken code in notes/scrap.txt)
  return server
}
// TODO server error catching

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
