import { config } from '@app/config'
import { FastifyInstance } from 'fastify'
import cookie from 'fastify-cookie'
import fp from 'fastify-plugin'
import session from '@fastify/session'
import { FastifySessionOpts } from '../types'

// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export default fp(
  async (fastify: FastifyInstance, opts: FastifySessionOpts) => {
    !config.isProd && fastify.log.info
    return fastify
    .register(cookie)
    .register(session, {
      saveUninitialized: opts.saveUninitialized,
      secret: opts.secret,
      cookie: {
        secure: config.isProd
      }
    })
  }
)
