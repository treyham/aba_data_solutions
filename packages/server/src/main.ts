import { prisma } from '@app/db'
import { config } from '@app/config'
import closeWithGrace from 'close-with-grace'
import Fastify from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'http'
import { plugin, opts } from './pluginConfig'
import { auth}  from '../src/plugins/auth'
import { db } from '../src/plugins/db'

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
      // .register(auth)
      // .register(db)
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
          🚀 Dev Server ready at: http://localhost:${config.env.serverPort}/altair
          ⭐️ You rock!\n\n`)
    })
  )
  .catch(console.error)