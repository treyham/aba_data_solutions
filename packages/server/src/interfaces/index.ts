import { AuthPlugOpts, AuthPropOpts } from './Auth'
import { BuildContext, DbPlugOpts, DbPropOpts } from './Db'
import { AutoloadPluginOptions } from 'fastify-autoload'

// using declaration merging, add your plugin props to the appropriate fastify interfaces
declare module 'fastify' {
  interface FastifyRequest {
    PluginProp: PluginOpts
    AuthProp: AuthPropOpts
    DbProp: DbPropOpts
  }
  interface FastifyReply {
    PluginProp: PluginOpts
    AuthProp: AuthPropOpts
    DbProp: DbPropOpts
  }
}

export type PluginOpts = {
  // Specify Support plugin options here
  authOpts: AuthPlugOpts
  dbOpts: DbPlugOpts
} & Partial<AutoloadPluginOptions>

export * from './Auth'
export * from './Db'