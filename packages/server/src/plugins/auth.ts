import { config } from '@app/config'
import { store } from '@app/db'
import session from '@mgcrea/fastify-session'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import cookie from 'fastify-cookie'
import fp from 'fastify-plugin'

// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export const auth = fp(async (fastify: FastifyInstance, opts: FastifyPluginOptions) => {
  config.isProd && fastify.log.info
  return await fastify
    .register(cookie)
    // types store.set are incompatable
    // Type 'PrismaSessionStore<"session">' is not assignable to type 'SessionStore'.
    //   Types of property 'set' are incompatible.
    //     Type '(sid: string, session: any, callback?: ((err?: unknown) => void) | undefined) => Promise<void>' is not assignable to type '(sid: string, session: SessionData, expiry?: number | null | undefined) => Promise<void>'.
    //       Types of parameters 'callback' and 'expiry' are incompatible.
    //         Type 'number | null | undefined' is not assignable to type '((err?: unknown) => void) | undefined'.
    //           Type 'null' is not assignable to type '((err?: unknown) => void) | undefined'.
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