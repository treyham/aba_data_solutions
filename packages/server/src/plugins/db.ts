import AltairFastify from 'altair-fastify-plugin'
import { config } from '@app/config'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import mercurius from 'mercurius'

// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export default fp(async (fastify: FastifyInstance, opts: FastifyPluginOptions) => {
  config.isProd && fastify.log.info
  return await fastify
    .register(mercurius, { ...fastify.config.dbOpts.MercuriusPluginOpts })
    .register(AltairFastify, { ...fastify.config.dbOpts.AltairaPluginOpts })
},
{
  name: 'db'
})