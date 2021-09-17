import * as http from 'http'
import FastifyInstance from 'fastify'

import fp from 'fastify-plugin'
// TODO validator plugin
export interface ValidatorPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<ValidatorPluginOptions>(async (fastify, opts) => {
  fastify.decorate('database', function () {
    return 'hugs'
  })
})
