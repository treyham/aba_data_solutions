import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { AuthPluginOpts } from '../plugins/auth'
import { DbPluginOpts } from '../plugins/db'

// using declaration merging, add your plugin props to the appropriate fastify interfaces

declare module 'fastify' {
  interface FastifyRequest {
    myPluginProp: string
  }
  interface FastifyReply {
    myPluginProp: number
  }
}
// define options
export interface ServicePluginOpts {
  // Specify Support plugin options here
  authOpts: AuthPluginOpts
  dbOpts: DbPluginOpts
}

// define plugin using callbacks
// const myPluginCallback: FastifyPluginCallback<AppPluginOpts> = (fastify, options, done) => {
//   fastify.decorateRequest('myPluginProp', 'super_secret_value')
//   fastify.decorateReply('myPluginProp', options)

//   done()
// }

// define plugin using promises
const myPluginAsync: FastifyPluginAsync<ServicePluginOpts> = async (fastify, options) => {
  fastify.decorateRequest('myPluginProp', 'super_secret_value')
  fastify.decorateReply('myPluginProp', options)
}

// export plugin using fastify-plugin
// export default fp(myPluginCallback, '3.x')
// or
export default fp(myPluginAsync, '3.x')