import { context, schema } from '@app/api'
import AltairFastify from 'altair-fastify-plugin'
import fp from 'fastify-plugin'
import mercurius from 'mercurius'
// import mercurius, {
//   IFieldResolver,
//   IResolvers,
//   MercuriusContext
// } from 'mercurius'
// TODO DbSchemaPluginOptions interface
export interface DbSchemaPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export default fp<DbSchemaPluginOptions>(async (fastify, opts) => {
  await fastify.register(mercurius, {
    schema,
    graphiql: false,
    ide: false,
    path: '/graphql',
    context: () => context // provide the prisma instance to the context
  })
  // See sample queries: http://pris.ly/e/ts/graphql-fastify-sdl-first#using-the-graphql-api
  await fastify.register(AltairFastify, {
    path: '/altair',
    baseURL: '/altair/',
    endpointURL: '/graphql' // should be the same as the mercurius 'path'
  })
})
