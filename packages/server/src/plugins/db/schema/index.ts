import { Context } from '@app/api'
import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import mercurius, { MercuriusSchemaOptions } from 'mercurius'
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

export interface AltairPluginOpts {
  path: string
  baseURL: string
  endpointURL: string
}

export interface DbSchemaPluginOpts {
  // Specify Support plugin options here
  MercuriusPluginOpts: MercuriusPluginOpts
  AltairaPluginOpts: AltairPluginOpts
}

console.log('schema')
// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export const dbSchemaPlugin: FastifyPluginAsync<DbSchemaPluginOpts> = fp(
  // my plugin
  (async (fastify, options) => {
    console.log('DbSchema plugins')
    const mercPlugin = fastify.register(mercurius, {
      
    } 
    )
    // const { MercuriusPluginOpts, AltairaPluginOpts} = options
    const mOpts = options
  }),
  '3.x'
)
