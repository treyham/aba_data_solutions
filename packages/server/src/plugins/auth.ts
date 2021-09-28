import { config } from '@app/config'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import cookie from 'fastify-cookie'
import fp from 'fastify-plugin'
import session from '@fastify/session'

// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export default fp(async (fastify: FastifyInstance, opts: FastifyPluginOptions) => {
  config.isProd && fastify.log.info
  return await fastify
    .register(cookie)
    .register(session, { ...fastify.config.authOpts.session })
    .addHook('preHandler', (request, reply) => {
      
    })
},
{
  name: 'auth'
})