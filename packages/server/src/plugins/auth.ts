import { config } from '@app/config';
import { FastifyInstance } from 'fastify';
import cookie from 'fastify-cookie';
import fp from 'fastify-plugin'
import session from '@fastify/session'
import { AuthOpts } from '../types';
// TODO misc plugin


// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp((async (fastify: FastifyInstance, opts: AuthOpts) => {
  return fastify
    .register(cookie)
    .register(session, {
      saveUninitialized: false,
      secret: config.env.sessionSecret,
      cookie: {
        secure: config.isProd
      }
    })
}))
  // fastify.decorate('auth', function () {
  //   return 'hugs'
  // })


// When using .decorate you have to specify added properties for Typescript
// declare module 'fastify' {
//   export interface FastifyInstance {
//     someSupport(): string;
//   }
// }
