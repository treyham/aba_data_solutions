import fp from 'fastify-plugin'
import { AuthPluginOpts, DbPluginOpts } from '../plugins'

// using declaration merging, add your plugin props to the appropriate fastify interfaces
declare module 'fastify' {
  interface FastifyRequest {
    servicePluginProp: ServiceOpts
  }
  interface FastifyReply {
    servicePluginProp: ServiceOpts
  }
}

export interface ServiceOpts {
  // Specify Support plugin options here
  authOpts: AuthPluginOpts
  dbOpts: DbPluginOpts
}


// export plugin using fastify-plugin
export default fp(async (fastify, options): Promise<void> => { 
  fastify.decorate('service', options) 
}, 
'3.x') 

