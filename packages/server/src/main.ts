import { config } from '@app/config'
import closeWithGrace from 'close-with-grace'
import Fastify from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'http'
import { root, pluginOpts } from './pluginConfig'

const server = Fastify({ logger: !config.isProd })
declare module 'fastify' {
  const server: FastifyInstance<Server, IncomingMessage, ServerResponse>
}

async function main() {
  !config.isProd && console.log('in development mode')
  const closeListeners = closeWithGrace(
    { delay: 500 }, // number of milliseconds for the graceful close to finish
    async function (signal, err: Console['error']) {
      err
        ? server.log.error(err)
        : await server.close()
    }
  )
  return (
    server
      // register server plugin
      .register(root, pluginOpts)
      // add hooks
      .addHook('onClose', async (instance, done) => {
        closeListeners.uninstall()
        done()
      })
  )
}

main()
  .then(server =>
    server.listen(config.env.serverPort, err => {
      err
        ? console.log(err)
        : console.log(`
          🚀 Dev Server ready at: http://localhost:${config.env.serverPort}/altair
          ⭐️ You rock!`)
    })
  )
  .catch(console.error)