import { Context } from '@app/api'
import { FastifyInstance } from 'fastify'
import { FastifyCookieOptions } from 'fastify-cookie'
import { MercuriusSchemaOptions } from 'mercurius'


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
  secret: string
  saveUninitialized: boolean
  cookie: FastifyCookieOptions
}

// TODO AuthPluginOptions interface
export interface AuthOpts {
  // Specify Support plugin options here
  session: FastifySessionOpts
  cookie: FastifyCookieOptions
}

// database
export interface MercuriusPluginOpts {
  schema: MercuriusSchemaOptions
  graphiql: boolean
  ide: boolean
  path: string
  context: Context
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

