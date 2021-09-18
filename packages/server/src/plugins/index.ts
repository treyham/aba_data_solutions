import fp from 'fastify-plugin'
import { ServiceOpts } from '../types'

console.log('plugins')
// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export default fp<ServiceOpts>(async (fastify, serviceOpts) => {
  console.log('main plugins')
  fastify.decorate('servicePlugins', async () => {
    await fastify.register(require('./auth'))                                  // TODO Error: plugin must be a function or a promise
    await fastify.register(require('./db'), serviceOpts.dbOpts)                // TODO Error: plugin must be a function or a promise
    
  })
})

export * from '../plugins/auth'
export * from '../plugins/db'
export * from '../plugins/misc'
export * from '../plugins/validator'