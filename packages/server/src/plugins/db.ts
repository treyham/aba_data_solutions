import AltairFastify from 'altair-fastify-plugin'
import { schema } from '@app/api'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import mercurius, {
  IFieldResolver,
  IResolvers,
  MercuriusLoaders,
  MercuriusContext,
  MercuriusOptions
} from 'mercurius'
import { DbOpts } from '../types'


// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export default fp(async (fastify: FastifyInstance, opts: DbOpts) => {
  return await fastify
    .register(mercurius, { //...mercOpts})
      schema: opts.MercuriusPluginOpts.schema,
      graphiql: opts.MercuriusPluginOpts.graphiql,
      ide: opts.MercuriusPluginOpts.ide,
      path: opts.MercuriusPluginOpts.path,
      context: () => (opts.MercuriusPluginOpts.context)
    })
      .register(AltairFastify, { ...opts.AltairaPluginOpts })
})
    
// })
// When using .decorate you have to specify added properties for Typescript
// declare module 'fastify' {
//   export interface FastifyInstance {
//     someSupport(): string;
//   }
// }

/**
Overload 1 of 3, '(plugin: FastifyPluginCallback<MercuriusOptions, Server>, opts?: FastifyRegisterOptions<MercuriusOptions> | undefined): FastifyInstance<...> & PromiseLike<...>', gave the following error.
    Type 'PrismaClient<PrismaClientOptions, never, RejectOnNotFound | RejectPerOperation | undefined>' 
      is not assignable to 
    type '(request: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>, reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>) => Record<...> | Promise<...>'.
    Type 'PrismaClient<PrismaClientOptions, never, RejectOnNotFound | RejectPerOperation | undefined>' provides no match for the signature '(request: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>, reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>): Record<...> | Promise<...>'.
  Overload 2 of 3, '(plugin: FastifyPluginAsync<MercuriusOptions, Server>, opts?: FastifyRegisterOptions<MercuriusOptions> | undefined): FastifyInstance<...> & PromiseLike<...>', gave the following error.
    Argument of type 'typeof mercurius' is not assignable to parameter of type 'FastifyPluginAsync<MercuriusOptions, Server>'.
      Type 'void' is not assignable to type 'Promise<void>'.
  Overload 3 of 3, '(plugin: FastifyPluginCallback<MercuriusOptions, Server> | FastifyPluginAsync<MercuriusOptions, Server> | Promise<...> | Promise<...>, opts?: FastifyRegisterOptions<...> | undefined): FastifyInstance<...> & PromiseLike<...>', gave the following error.
    Type 'PrismaClient<PrismaClientOptions, never, RejectOnNotFound | RejectPerOperation | undefined>' is not assignable to type '(request: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>, reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>) => Record<...> | Promise<...>'
*/