import fp from 'fastify-plugin'
// TODO schema plugin
export interface SchemaPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SchemaPluginOptions>(async (fastify, opts) => {
  fastify.decorate('database', function () {
    return 'hugs'
  })
})