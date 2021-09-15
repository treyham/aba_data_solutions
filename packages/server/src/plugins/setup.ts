import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import AltairFastify from 'altair-fastify-plugin'
import mercurius, {
    IFieldResolver,
    IResolvers,
    MercuriusContext,
  } from 'mercurius'
import { context, schema,  } from '@app/api'
import { config } from '@app/config'


export interface SetupPluginOptions {
    // Specify Support plugin options here
  }
  
  // The use of fastify-plugin is required to be able
  // to export the decorators to the outer scope
  export default fp<SetupPluginOptions>(async (fastify, opts) => {
    fastify.decorate('setup', function () {
      return 'fuck'
    })
  })
  
  // When using .decorate you have to specify added properties for Typescript
  declare module 'fastify' {
    export interface FastifyInstance {
      
    }
  }