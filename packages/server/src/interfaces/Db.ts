import 'reflect-metadata'
import { BuildContext } from '@app/api'
import { GraphQLSchema } from 'graphql'


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