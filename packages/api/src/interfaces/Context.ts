import { Session, SessionData} from '@mgcrea/fastify-session'
import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaContext } from '@app/db'

export interface BuildContext {
  (
    req: FastifyRequest & {
      session: Session<SessionData>
    },
    _reply: FastifyReply,
  ): Promise<Context>
}

// configure fastify context
export type Context = {
  // add properties to fastify request
  req: FastifyRequest & {session: Session<SessionData>}
    // add properties to fastify response
  reply: FastifyReply
// add properties to fastify context
} & PrismaContext

export type PrismaSession = Session<SessionData>