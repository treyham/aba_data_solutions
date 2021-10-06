import { AutoloadPluginOptions } from 'fastify-autoload'
import { prisma } from '@app/api'
import { AuthPlugOpts, AuthPropOpts } from './Auth'
import { DbPlugOpts, DbPropOpts } from './Db'

// using declaration merging, add your plugin props to the appropriate fastify interfaces
declare module 'fastify' {
  export interface FastifyInstance {
    config: PluginOpts
    prisma: typeof prisma
  }

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
