import { Session } from '@mgcrea/fastify-session'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaClient } from '.prisma/client'

// configure fastify context
export type Context = {
  // add properties to fastify request
  req: FastifyRequest & {session: Session}
    // add properties to fastify response
  reply: FastifyReply
// add properties to fastify context
} & PrismaContext

export interface PrismaContext {
  prisma: PrismaClient
}