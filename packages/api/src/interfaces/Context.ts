import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaClient } from '.prisma/client'

export type Context = {
    req: FastifyRequest
    reply: FastifyReply
  } & PrismaContext
  
  export interface PrismaContext {
    prisma: PrismaClient
  }
