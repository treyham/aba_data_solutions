import { Session, SessionData} from '@mgcrea/fastify-session'
import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaClient } from '.prisma/client'

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
  req: FastifyRequest
    // add properties to fastify response
  reply: FastifyReply
// add properties to fastify context
} & PrismaContext

export interface PrismaContext {
  prisma: PrismaClient,
  session: Session<SessionData>
}

export type PrismaSession = Session<SessionData>