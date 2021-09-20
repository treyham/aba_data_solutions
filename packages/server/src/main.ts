import { IncomingMessage, Server, ServerResponse } from 'http'

import AltairFastify from 'altair-fastify-plugin'
import closeWithGrace from 'close-with-grace';
import Fastify, { FastifyPluginAsync } from 'fastify'
import mercurius, {
  IFieldResolver,
  IResolvers,
  MercuriusContext,
  MercuriusLoaders
} from 'mercurius'
import { context, schema } from '@app/api'
import { config } from '@app/config'

const server = Fastify({ logger: !config.isProd})
declare module 'fastify' {
  const server: FastifyInstance<Server, IncomingMessage, ServerResponse>
}

async function main() {
  // delay is the number of milliseconds for the graceful close to finish
  const closeListeners = closeWithGrace({ delay: 500 }, async function (signal, err: Console['error']) {
    if (err) server.log.error(err)
    await server.close()
  })
  return server
  .register(AltairFastify, {
    path: '/altair',
    baseURL: '/altair/',
    // should be the same as the mercurius 'path'
    endpointURL: '/api'                                                  
  })
    .addHook('onClose', async (instance, done) => {
    closeListeners.uninstall()
    done()
  })
  // add hooks
    .addHook('preHandler', (request, reply, next) => {
    console.log('preHandler hook')
    next()
  })
  // })

  //if (config.node_dev) fastify.log.info()
  

}
main()
  // https://github.com/fastify/middie
  .then(server => server.listen(config.env.serverPort, () => {
    console.log(`
    🚀 Dev Server ready at: http://localhost:${config.env.serverPort}/altair
    ⭐️ You rock!
    `)
  }))                                                       
  .catch(console.error)
  .finally(async () => {
    await context.prisma.$disconnect()
    console.log('disconnecting....')
  })
