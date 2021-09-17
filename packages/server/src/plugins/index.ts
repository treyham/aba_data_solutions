import fp from 'fastify-plugin'
import { ServicePluginOpts } from '../types'
import { dbPlugin } from './db'


// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export default fp<ServicePluginOpts>(async (fastify, opts) => {
  fastify.decorate('plugins', async () => {
    fastify.register(require('./auth'))
    fastify.register(dbPlugin, opts.dbOpts)
  })
})
