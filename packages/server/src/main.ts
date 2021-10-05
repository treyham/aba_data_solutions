import { prisma } from '@app/api'
import { config } from '@app/config'
import closeWithGrace from 'close-with-grace'
import Fastify from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'http'
import plugin, { opts } from './pluginConfig'

declare module 'fastify' {
  const server: FastifyInstance<Server, IncomingMessage, ServerResponse>
}

async function main() {
  const server = Fastify({
    logger: {
      prettyPrint: {
        colorize: true,
        translateTime: true,
      }
    }
  })
  const closeListeners = closeWithGrace(
    { delay: 500 }, // number of milliseconds for the graceful close to finish
    async function (signal, err: Console['error']) {
      err
        ? server.log.error(err)
        : await server.close()
    }
  )
  !config.isProd && console.log('in development mode')
  return (
    server
      // decorators
      .decorate('config', opts)
      .decorate('prisma', prisma)
      // plugins
      .register(plugin)
      // hooks
      .addHook('onClose', async (instance, done) => {
        closeListeners.uninstall()
        done()
      })
  )
}
main()
  .then(server =>
    server
    .listen(config.env.serverPort, err => {
      err
        ? console.log(err)
        : console.log(`
          \t\t🚀 Dev Server ready at: http://localhost:${config.env.serverPort}/altair
          \t\t⭐️ You rock!\n\n`)
    })
  )
  .catch(console.error)