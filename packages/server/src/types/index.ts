import 'reflect-metadata'
import { PrismaContext } from '@app/api'
import { FastifyReply, FastifyRequest } from 'fastify'
import { FastifyCookieOptions } from 'fastify-cookie'
import { GraphQLSchema } from 'graphql'

// using declaration merging, add your plugin props to the appropriate fastify interfaces
declare module 'fastify' {
  interface FastifyRequest {
    PluginProp: PluginOpts
    AuthProp: AuthOpts
    DbProp: DbOpts
  }
  interface FastifyReply {
    PluginProp: PluginOpts
    AuthProp: AuthOpts
    DbProp: DbOpts
  }
}

// auth
export interface FastifySessionOpts {
  cookieName: string
  secret: string
  cookie: { secure: boolean }
}

// TODO AuthPluginOptions interface
export interface AuthOpts {
  // Specify Support plugin options here
  session: FastifySessionOpts
  cookie: FastifyCookieOptions
}

// database
export type Contex = {
  req: FastifyRequest
  reply: FastifyReply
} & PrismaContext

export interface BuildContext {
  (req: FastifyRequest, _reply: FastifyReply): Promise<Contex> // TODO this is why, should be returning promise<context> i think
  // { authorization: IncomingHttpHeaders }
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
export interface DbOpts {
  // Specify Support plugin options here
  MercuriusPluginOpts: MercuriusPluginOpts
  AltairaPluginOpts: AltairPluginOpts
}

// validation
export interface ValidOpts {
  // Specify Support plugin options here
}

// server
export interface PluginOpts {
  // Specify Support plugin options here
  authOpts: AuthOpts
  dbOpts: DbOpts
}

// export plugin using fastify-plugin
// export default fp(async (fastify: FastifyInstance, options: pluginOpts): Promise<void> => {
//   fastify.decorate('plugins', options)
//   fastify.decorate('auth', options.AuthPluginOpts)
//   fastify.decorate('db', options.DbPluginOpts)
// },
// '3.x')
