import dotenv from 'dotenv'
import { assert } from 'console'

dotenv.config()

const {
    NODE_DEV,
    VUE_APP_PORT,
    SERVER_PORT,
    DATABASE_URL,
    COOKIE_SECRET,
    SESSION_SECRET
    // CERTIFICATE_PATH,
    // DECRYPTED_KEY_PATH
} = process.env

assert(NODE_DEV, 'NODE_ENV is required.')
assert(VUE_APP_PORT, 'VUE_APP_PORT is required.')
assert(SERVER_PORT, 'SERVER_PORT is required.')
assert(DATABASE_URL, 'DATABASE_URL is required.')
assert(COOKIE_SECRET, 'COOKIE_SECRET is required.')
assert(SESSION_SECRET, 'SESSION_SECRET is required.')
// assert(CERTIFICATE_PATH, 'CERTIFICATE_PATH is required.')
// assert(DECRYPTED_KEY_PATH, 'DECRYPTED_KEY_PATH is required.')

export interface Config {
    node_dev: string
    vueapp_port: string,
    server_port: string,
    database_url: string,
    cookie_secret: string
    session_secret: string,

}


export const config: Config = {
    node_dev: NODE_DEV as string,
    vueapp_port: VUE_APP_PORT as string,
    server_port: SERVER_PORT as string,
    database_url: DATABASE_URL as string,
    cookie_secret: DATABASE_URL as string,
    session_secret: SESSION_SECRET as string
}

