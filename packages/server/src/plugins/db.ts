import AltairFastify from 'altair-fastify-plugin'
import { config } from '@app/config'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import mercurius from 'mercurius'
import { PluginOpts } from '../pluginConfig'

// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export default fp(async (fastify: FastifyInstance, opts: PluginOpts) => {
  config.isProd && fastify.log.info
  return await fastify
    .register(mercurius, { ...opts.dbOpts.MercuriusPluginOpts })
    .register(AltairFastify, { ...opts.dbOpts.AltairaPluginOpts })
})

// })
// When using .decorate you have to specify added properties for Typescript
// declare module 'fastify' {
//   export interface FastifyInstance {
//     someSupport(): string;
//   }
// }
