import { context, Context, schema } from '@app/api'
import AltairFastify from 'altair-fastify-plugin'
import fp from 'fastify-plugin'
import mercurius, { MercuriusContext, MercuriusSchemaOptions } from 'mercurius'
// import mercurius, {
//   IFieldResolver,
//   IResolvers,
//   MercuriusContext
// } from 'mercurius'
// TODO DbSchemaPluginOptions interface

export interface MercuriusPluginOpts {
  schema: MercuriusSchemaOptions
  graphiql: boolean
  ide: boolean
  path: string
  prismaClient: Context
}

export interface AltairaPluginOpts {
  path: string
  baseURL: string
  endpointURL: string
}

export interface DbSchemaPluginOpts {
  // Specify Support plugin options here
  MercuriusPluginOpts: MercuriusPluginOpts
  AltairaPluginOpts: AltairaPluginOpts
}

// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export const dbSchemaPlugin = fp<DbSchemaPluginOpts>(
  async (fastify, opts: DbSchemaPluginOpts) => {
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
  }
)
