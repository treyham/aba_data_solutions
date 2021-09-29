import { config } from '@app/config'
import session from '@mgcrea/fastify-session'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import cookie from 'fastify-cookie'
import fp from 'fastify-plugin'

// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export default fp(async (fastify: FastifyInstance, opts: FastifyPluginOptions) => {
  config.isProd && fastify.log.info
  return await fastify
    .register(cookie)
    .register(session, { ...fastify.config.authOpts.session })
    .addHook('preHandler', (request, reply, done) => {
      const sess = request.session
      console.log('preHandler', {sess})
      done()
    })
},
{
  name: 'auth'
})