import * as http from 'http'
import FastifyInstance from 'fastify'

// When using .decorate you have to specify added properties for Typescript
/**
 * interface FastifyInstance<
 *   RawServer extends RawServerBase = http.Server, 
 *   RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>, 
 *   RawReply extends RawReplyDefaultExpression<...> = RawReplyDefaultExpression<...>, 
 *   Logger = FastifyLoggerInstance, 
 *   HttpServer = http.Server, 
 *   HttpRequest = http.IncomingMessage, 
 *   HttpResponse = http.ServerResponse
 * >
 */
// declare module 'fastify' {
//     export interface FastifyInstance<
//       HttpServer = http.Server,
//       HttpRequest = http.IncomingMessage,
//       HttpResponse = http.ServerResponse
//     > {
      
//     }
//   }