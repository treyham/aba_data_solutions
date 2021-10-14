import dotenv from 'dotenv'
import { assert } from 'console'
import { path, Path } from './constants'

dotenv.config()

const {
  NODE_ENV,
  VUE_APP_PORT,
  SERVER_PORT,
  DATABASE_URL,
  COOKIE_SECRET,
  SESSION_SECRET
  // CERTIFICATE_PATH,
  // DECRYPTED_KEY_PATH
} = process.env

assert(NODE_ENV, 'NODE_ENV is required.')
assert(VUE_APP_PORT, 'VUE_APP_PORT is required.')
assert(SERVER_PORT, 'SERVER_PORT is required.')
assert(COOKIE_SECRET, 'COOKIE_SECRET is required.')
assert(SESSION_SECRET, 'SESSION_SECRET is required.')

export interface Env {
  nodeEnv: string
  vuePort: string
  serverPort: string
  // dbUrl: string
  cookieSecret: string
  sessionSecret: string
}

export interface Config {
  env: Env
  isProd: boolean
  path: Path
  session: {
    cookie: {
      name: string
      httpOnly: boolean
      expires: Date
    }
    saveUninitialized: boolean
  }
}

export const config: Config = {
  env: {
    nodeEnv: NODE_ENV as string,
    vuePort: VUE_APP_PORT as string,
    serverPort: SERVER_PORT as string,
    cookieSecret: DATABASE_URL as string,
    sessionSecret: SESSION_SECRET as string
  },
  isProd: NODE_ENV === 'production',
  path,
  session: {
    cookie: {
      name: 'treyscookie',
      httpOnly: true,
      expires: new Date(Date.now() + 3600000 * 8), // set cookie to expire in 8 hours
    },
    saveUninitialized: false
  }
}

/**   auth.ts (plugin)
 * 
 * 
 * No overload matches this call.
  Overload 1 of 3, 
  '(plugin: FastifyPluginCallback<FastifySessionOptions, Server>, opts?: FastifyRegisterOptions<FastifySessionOptions> | undefined): FastifyInstance<...> & PromiseLike<...>', gave the following error.
    Argument of type 
    '{
      cookieName: string; 
      secret: string; 
      cookie: { 
        httpOnly: boolean; 
        secure: boolean; 
        expires: Date; 
      };
      saveUninitialized: boolean;
      store: PrismaSessionStore<"session">; }' 
    is not assignable to parameter of type 'FastifyRegisterOptions<FastifySessionOptions> | undefined'.
      Type 
        '{
          cookieName: string;
          secret: string; 
          cookie: 
          { httpOnly: boolean;
            secure: boolean;
            expires: Date;
          }; 
          saveUninitialized: boolean;
          store: PrismaSessionStore<"session">; 
        }' 
      is not assignable to type 'RegisterOptions & FastifySessionOptions'.
        Type '{ cookieName: string;
          secret: string;
          cookie: {
            httpOnly: boolean;
            secure: boolean;
            expires: Date;
          };
          saveUninitialized: boolean;
          store: PrismaSessionStore<"session">;
        }' 
        is not assignable to type 'FastifySessionOptions'.
          The types of 'store.set' are incompatible between these types.
            Type 
              '(
                sid: string, 
                session: any, 
                callback?: ((err?: unknown) => void) | undefined) => Promise<void>' 
            is not assignable to 
            type 
            '(
                sid: string,
                session: SessionData,
                expiry?: number | null | undefined
              ) => Promise<void>
            '.
              Types of parameters 'callback' and 'expiry' are incompatible.
                Type 'number | null | undefined' is not assignable to type '((err?: unknown) => void) | undefined'.
                  Type 'null' is not assignable to type '((err?: unknown) => void) | undefined'.

  Overload 2 of 3, 
  '(plugin: FastifyPluginAsync<FastifySessionOptions, Server>, opts?: FastifyRegisterOptions<FastifySessionOptions> | undefined): FastifyInstance<...> & PromiseLike<...>', gave the following error.
    Argument of type 
    '{ cookieName: string;
      secret: string;
      cookie: {
        httpOnly: boolean;
        secure: boolean;
        expires: Date; };
        saveUninitialized: boolean;
        store: PrismaSessionStore<"session">; }'
     is not assignable to parameter of type 'FastifyRegisterOptions<FastifySessionOptions> | undefined'.
      Type 
        '{
          cookieName: string;
          secret: string;
          cookie: { 
            httpOnly: boolean;
            secure: boolean;
            expires: Date;
          }; 
          saveUninitialized: boolean;
          store: PrismaSessionStore<"session">; }' 
      is not assignable to type 'RegisterOptions & FastifySessionOptions'.
        Type 
        '{ 
          cookieName: string;
          secret: string;
          cookie: {
            httpOnly:
            boolean;
            secure: boolean;
            expires: Date;
          }; 
          saveUninitialized: boolean;
          store: PrismaSessionStore<"session">; }' is not assignable to type 'FastifySessionOptions'.
        Types of property 'store' are incompatible.
            Type 'PrismaSessionStore<"session">' is not assignable to type 'SessionStore'.

  Overload 3 of 3, 
  '(plugin: FastifyPluginAsync<FastifySessionOptions, Server> | FastifyPluginCallback<FastifySessionOptions, Server> | Promise<...> | Promise<...>, opts?: FastifyRegisterOptions<...> | undefined): FastifyInstance<...> & PromiseLike<...>', gave the following error.
    Argument of type 
    '{ 
      cookieName: string;
      secret: string;
      cookie: { 
        httpOnly: boolean;
        secure: boolean;
        expires: Date;
      }; 
      saveUninitialized: boolean;
      store: PrismaSessionStore<"session">; }' 
    is not assignable to parameter of type 'FastifyRegisterOptions<FastifySessionOptions> | undefined'.
      Type 
      '{ 
        cookieName: string;
        secret: string;
        cookie: { 
          httpOnly: boolean; 
          secure: boolean; 
          expires: Date;
        }; 
        saveUninitialized: boolean; 
        store: PrismaSessionStore<"session">; }' 
      is not assignable to type 'RegisterOptions & FastifySessionOptions'.
        Type 
        '{ 
          cookieName: string;
          secret: string;
          cookie: {
            httpOnly: boolean;
            secure: boolean;
            expires: Date;
          }; 
          saveUninitialized: boolean; 
          store: PrismaSessionStore<"session">; }'
        is not assignable to type 'FastifySessionOptions'.
          Types of property 'store' are incompatible.
            Type 'PrismaSessionStore<"session">' is not assignable to type 'SessionStore'.ts(2769)
 */