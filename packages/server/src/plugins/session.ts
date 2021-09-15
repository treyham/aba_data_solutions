import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import { context, schema,  } from '@app/api'
import { config } from '@app/config'


export interface SessionPluginOptions {
    // Specify Support plugin options here
  }
  
  // The use of fastify-plugin is required to be able
  // to export the decorators to the outer scope
  export default fp<SessionPluginOptions>(async (fastify, opts) => {
    fastify.decorate('session', function () {
      return 'fuck'
    })
  })
  
  // When using .decorate you have to specify added properties for Typescript
  declare module 'fastify' {
    export interface FastifyInstance {
      
    }
  }
  