import fp from 'fastify-plugin'
// TODO schema plugin
export interface DbSchemaPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<DbSchemaPluginOptions>(async (fastify, opts) => {
  fastify.decorate('database', function () {
    return 'hugs'
  })
})