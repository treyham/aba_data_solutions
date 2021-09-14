import cookie, { FastifyCookieOptions } from 'fastify-cookie'
import fastifySession from 'fastify-session'
import fp from 'fastify-plugin'
import { config } from '@app/config'

export const plugin = async (fastify) => {
    await fastify.register(cookie)
    await fastify.register(fastifySession, {
        secret: config.session_secret.split(','),             // allows comma delim string of secrets
        saveUninitialized: false
    })
}