import fp from 'fastify-plugin'
import { authPlugin, AuthPluginOpts } from './auth'
import { dbPlugin, DbPluginOpts } from './db'

// TODO AppPluginOptions interface
export interface AppPluginOpts {
  // Specify Support plugin options here
  authOpts: AuthPluginOpts
  dbOpts: DbPluginOpts
}

// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export default fp<AppPluginOpts>(async (fastify, opts) => {
  fastify.decorate('plugins', async () => {
    fastify.register(require('./auth'))
    fastify.register(dbPlugin, opts.dbOpts)
  })
})
