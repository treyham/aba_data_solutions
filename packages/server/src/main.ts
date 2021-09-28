import { config } from '@app/config'
import closeWithGrace from 'close-with-grace'
import Fastify from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'http'
import { prismaContext } from 'packages/api/src/context'
import plugin, { pluginOpts } from './pluginConfig'

const server = Fastify({
  logger: {
    prettyPrint: {
      colorize: true,
      translateTime: true,
    }
  }
})

declare module 'fastify' {
  const server: FastifyInstance<Server, IncomingMessage, ServerResponse>
}

async function main() {
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
      .decorate('config', pluginOpts)
      .decorate('prisma', prismaContext.prisma)
    // register server plugin
      .register(plugin)
      // add hooks
      .addHook('onClose', async (instance, done) => {
        closeListeners.uninstall()
        done()
      })
  )
}
main()
  .then(server =>
    server
    // .decorate('config', pluginOpts)
    .listen(config.env.serverPort, err => {
      err
        ? console.log(err)
        : console.log(`
          \t\t🚀 Dev Server ready at: http://localhost:${config.env.serverPort}/altair
          \t\t⭐️ You rock!\n\n`)
    })
  )
  .catch(console.error)