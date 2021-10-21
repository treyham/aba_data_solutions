import { FastifySessionOpts } from './../../types/interfaces/index.d';
import { CookieSerializeOptions, FastifyCookieOptions } from 'fastify-cookie';
import { SessionConfiguration } from '@mgcrea/fastify-session/lib/session'
import { FastPrismaStore } from 'packages/api/src/store';
  
interface MySession {
  key: string
  store: FastPrismaStore
  cookie: CookieSerializeOptions
  cookieName: string
}

export interface SecretSession extends MySession { secret: string }
export interface KeySession extends MySession { key: string } 

export interface AuthPlugOpts {
  // Specify Support plugin options here
  sessionOpts: SessionConfiguration
  session: MySession
}
// export interface AuthPropOpts {
  
// }
