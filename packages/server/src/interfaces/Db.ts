import 'reflect-metadata'
import { Context } from '@app/api'
import { FastifyReply, FastifyRequest } from 'fastify'
import { GraphQLSchema } from 'graphql'

export interface BuildContext {
    (req: FastifyRequest, _reply: FastifyReply): Promise<Context>
  }
  
  export interface MercuriusPluginOpts {
    schema: GraphQLSchema
    graphiql: boolean
    ide: boolean
    path: string
    context: BuildContext
  }
  export interface AltairPluginOpts {
    path: string
    baseURL: string
    endpointURL: string
  }
  export interface DbPlugOpts {
    // Specify Support plugin options here
    MercuriusPluginOpts: MercuriusPluginOpts
    AltairaPluginOpts: AltairPluginOpts
  }

  export interface DbPropOpts {
      
}