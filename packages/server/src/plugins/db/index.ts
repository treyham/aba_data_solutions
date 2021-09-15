import fp from 'fastify-plugin'
import { DbSchemaPluginOptions } from './schema'

export interface DbPluginOptions {
  // Specify Support plugin options here
  schemaOpts?: DbSchemaPluginOptions
}

// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export const dbPlugin = fp<DbPluginOptions>(async (fastify, opts) => {
  fastify.decorate('db', function () {
    fastify.register(require('./schema'))
  })
})