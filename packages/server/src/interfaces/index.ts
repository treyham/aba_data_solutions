import { AuthOpts } from './Auth'
import { BuildContext, DbOpts } from './Db'

export { AuthOpts, BuildContext, DbOpts } 

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

export interface PluginOpts {
  // Specify Support plugin options here
  authOpts: AuthOpts
  dbOpts: DbOpts
}