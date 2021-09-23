import { config } from '@app/config'
import closeWithGrace from 'close-with-grace'
import Fastify from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'http'
import plugin, { pluginOpts } from './pluginConfig'


const server = Fastify({ logger: !config.isProd })
declare module 'fastify' {
  const server: FastifyInstance<Server, IncomingMessage, ServerResponse>
}

async function main() {
  (!config.isProd) && console.log('in development mode')                       // noop if in
  // delay is the number of milliseconds for the graceful close to finish
  const closeListeners = closeWithGrace(
    { delay: 500 },
    async function (signal, err: Console['error']) {
      if (err) server.log.error(err)
      await server.close()
    }
  )
  
  return (
    server
    // register server plugin
    .register(plugin, pluginOpts)
    // add hooks
    .addHook('onRequest', (request, reply, done) => {
      request.log.info(`\nonRequest\n`, { url: request.raw.url, id: request.id }, "received request")
      console.log({request})
      done()
    })
    .addHook("onResponse", (req, reply, done) => {
      req.log.info(
        `\nonResponse\n`, {
          url: req.raw.url, // add url to response as well for simple correlating
          statusCode: reply.raw.statusCode,
        },
        "request completed"
      )
      done()
    })
    .addHook('onClose', async (instance, done) => {
      closeListeners.uninstall()
      done()
    })
  )
}

main()
  .then(server =>
    server.listen(config.env.serverPort, (err) => {
      err? 
        console.log(err) :
        console.log(`
    🚀 Dev Server ready at: http://localhost:${config.env.serverPort}/altair
    ⭐️ You rock!`
        )
      })
  )
  .catch(console.error)
