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
  cookie: {
    name: string
    httpOnly: boolean
    expires: Date
  }
  saveUninitialized: boolean
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
  // TODO FIX: this is the cookie the server has (kind of)
  cookie: {
      name: 'qidXD',
      httpOnly: true,
      expires: new Date(Date.now() + 3600000 * 8), // set cookie to expire in 8 hours
      
    },
    saveUninitialized: false
}