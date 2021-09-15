import fp from 'fastify-plugin'
// TODO auth plugin
export interface AuthPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<AuthPluginOptions>(async (fastify, opts) => {
  fastify.decorate('database', function () {
    return 'hugs'
  })
})