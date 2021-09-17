import fp from 'fastify-plugin'
import { DbSchemaPluginOpts } from './schema'

export interface DbPluginOpts {
  // Specify Support plugin options here
  schemaOpts?: DbSchemaPluginOpts
}

// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export const dbPlugin = fp<DbPluginOpts>(async (fastify, opts) => {
  fastify.decorate('db', function () {
    fastify.register(require('./schema'))
  })
})
