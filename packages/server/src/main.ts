import { IncomingMessage, Server, ServerResponse } from 'http'

import closeWithGrace from 'close-with-grace'
import Fastify, { FastifyPluginAsync } from 'fastify'
import mercurius, {
  IFieldResolver,
  IResolvers,
  MercuriusContext,
  MercuriusLoaders
} from 'mercurius'
import { context } from '@app/api'
import { config } from '@app/config'

const server = Fastify({ logger: !config.isProd })
declare module 'fastify' {
  const server: FastifyInstance<Server, IncomingMessage, ServerResponse>
}

async function main() {
  // delay is the number of milliseconds for the graceful close to finish
  const closeListeners = closeWithGrace(
    { delay: 500 },
    async function (signal, err: Console['error']) {
      if (err) server.log.error(err)
      await server.close()
    }
  )
  // add hooks
  return (
    server
      .addHook('onClose', async (instance, done) => {
        closeListeners.uninstall()
        done()
      })
  )
}

main()
  .then(server =>
    server.listen(config.env.serverPort, () => {
      console.log(`
    🚀 Dev Server ready at: http://localhost:${config.env.serverPort}/altair
    ⭐️ You rock!
    `)
      console.log(`node env prod: ${config.isProd}`)
    })
  )
  .catch(console.error)
  .finally(async () => {
    await context.prisma.$disconnect()
    console.log('disconnecting....')
  })
