import fp from 'fastify-plugin'
import auth, { AuthPluginOptions } from './auth'
import { dbPlugin, DbPluginOptions } from './db'

// TODO AppPluginOptions interface
export interface AppPluginOptions {
  // Specify Support plugin options here
  authOpts: AuthPluginOptions
  dbOpts: DbPluginOptions
}

// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export default fp<AppPluginOptions>(async (fastify, opts) => {
  fastify.decorate('plugins', async () => {
    fastify.register(auth, opts.authOpts)
    fastify.register(dbPlugin, opts.dbOpts)
  })
})