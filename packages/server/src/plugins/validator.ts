import fp from 'fastify-plugin'
import { ValidOpts } from '../types'
// TODO validator plugin

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<ValidOpts>(async (fastify, opts) => {
  fastify.decorate('validator', function () {
    return 'hugs'
  })
})
