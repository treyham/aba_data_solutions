import dotenv from 'dotenv'
import { assert } from 'console'
import { constant, path, Path } from './constants'

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
assert(DATABASE_URL, 'DATABASE_URL is required.')
assert(COOKIE_SECRET, 'COOKIE_SECRET is required.')
assert(SESSION_SECRET, 'SESSION_SECRET is required.')
// assert(CERTIFICATE_PATH, 'CERTIFICATE_PATH is required.')
// assert(DECRYPTED_KEY_PATH, 'DECRYPTED_KEY_PATH is required.')
export interface Env {
  nodeEnv: string
  vuePort: string
  serverPort: string
  dbUrl: string
  cookieSecret: string
  sessionSecret: string
}

export interface Config {
  env: Env
  isProd: boolean
  intro: (isProd: boolean) => boolean
  path: Path
  // functions: Functions
}

export const config: Config = {
  env: {
    nodeEnv: NODE_ENV as string,
    vuePort: VUE_APP_PORT as string,
    serverPort: SERVER_PORT as string,
    dbUrl: DATABASE_URL as string,
    cookieSecret: DATABASE_URL as string,
    sessionSecret: SESSION_SECRET as string
  },
  isProd: NODE_ENV === 'production',
  intro: constant.intro,
  path
}
