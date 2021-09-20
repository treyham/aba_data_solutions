import { context, schema } from '@app/api'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import mercurius, {
  IFieldResolver,
  IResolvers,
  MercuriusContext
} from 'mercurius'
import { DbOpts } from '../types'
declare module 'mercurius' {}

// The use of fastify-plugin is required to be able to export the decorators to the outer scope
export default fp(async (fastify: FastifyInstance, opts: DbOpts) => {
  return await fastify.register(mercurius, {
    schema,
    graphiql: false,
    ide: false,
    path: '/api',
    context: () => context
  })
})
// When using .decorate you have to specify added properties for Typescript
// declare module 'fastify' {
//   export interface FastifyInstance {
//     someSupport(): string;
//   }
// }
