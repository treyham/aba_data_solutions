import { Session } from '@mgcrea/fastify-session'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaClient } from '.prisma/client'

export type Context = {
  req: FastifyRequest & {session: Session}
  reply: FastifyReply
} & PrismaContext

export interface PrismaContext {
  prisma: PrismaClient
}