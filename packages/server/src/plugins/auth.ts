// import { config } from '@app/config'
// import { FastifyInstance } from 'fastify'
// import cookie from 'fastify-cookie'
// import fp from 'fastify-plugin'
// import session from '@fastify/session'
// import { PluginOpts } from '../pluginConfig'

// // The use of fastify-plugin is required to be able to export the decorators to the outer scope
// export default fp(async (fastify: FastifyInstance, opts: PluginOpts) => {
//   config.isProd && fastify.log.info
//   return fastify.register(cookie).register(session, {
//     cookieName: opts.authOpts.session.cookieName,
//     secret: opts.authOpts.session.secret,
//     cookie: { secure: opts.authOpts.session.cookie.secure }
//   })
// })

import fp from 'fastify-plugin'
import { ValidOpts } from '../types'
// TODO validator plugin

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<ValidOpts>(async (fastify, opts) => {
  fastify.decorate('auth2', function () {
    return 'hugs'
  })
})
