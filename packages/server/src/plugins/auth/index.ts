import fp from 'fastify-plugin'
import cookie, { FastifyCookieOptions } from 'fastify-cookie'
import fastifySession from 'fastify-session'
import { config } from '@app/config'
import FastifySessionPlugin from 'fastify-session'
import { nextTick } from 'process'

export interface FastifySessionOptions {
  secret: string
  saveUninitialized: boolean
  cookie: FastifyCookieOptions
}

// TODO AuthPluginOptions interface
export interface AuthPluginOptions {
  // Specify Support plugin options here
  session: FastifySessionOptions
  cookie: FastifyCookieOptions
}

export interface AuthPlugin {
  opts: AuthPluginOptions
}

// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export const authPlugin = fp<AuthPluginOptions>(
  async (fastify, opts: AuthPluginOptions) => {
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
