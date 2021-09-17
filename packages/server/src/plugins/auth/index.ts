import fp from 'fastify-plugin'
import cookie, { FastifyCookieOpts } from 'fastify-cookie'
import fastifySession from 'fastify-session'
import { config } from '@app/config'
import FastifySessionPlugin from 'fastify-session'

export interface FastifySessionOpts {
  secret: string
  saveUninitialized: boolean
  cookie: FastifyCookieOpts
}

// TODO AuthPluginOptions interface
export interface AuthPluginOpts {
  // Specify Support plugin options here
  session: FastifySessionOpts
  cookie: FastifyCookieOpts
}

// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export const authPlugin = fp<AuthPluginOpts>(
  async (fastify, opts: AuthPluginOpts) => {
    fastify.decorate('auth', async () => {
      await fastify.register(cookie)
      await fastify.register(fastifySession, {
        secret: opts.session.secret.split(','), // allows comma delim string of secrets
        saveUninitialized: config.env.isProd,
        cookie: opts.cookie
      } as any) // TODO fix any
    })
  }
)
