import { Context, FastPrismaStore, prisma } from '@app/api'
import { config } from '@app/config'
import { SessionConfiguration } from '@mgcrea/fastify-session/lib/session'
import { AuthPlugOpts } from '../interfaces'
import { KeySession } from './../interfaces/Auth'

export const getLoggedIn = (
  ctx: Context
) => {
  return ctx.req.session
    ? ctx.req.session
    : undefined
}

export const authOpts: AuthPlugOpts = {
  sessionOpts: {
    secretKeys: [Buffer.from(config.env.sessionSecret, 'base64')],
    store: new FastPrismaStore(prisma),
    cookieOptions: config.cookie
  }
}

// export const configSecret = (opts: SessionConfiguration): FastifyRegisterOptions<SecretSession> => {
//   return {
//     secret: opts.secretKeys[0].toString(),
//     store: opts.store,
//     cookie: opts.cookieOptions
//   }
// }

export const configKey = (opts: SessionConfiguration): KeySession => {
  return {} as KeySession
}