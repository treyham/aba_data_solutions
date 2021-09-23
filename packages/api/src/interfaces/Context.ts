import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaClient } from '@prisma/client'

export interface Context {
  //(request: FastifyRequest, reply: FastifyReply): { prisma: PrismaClient },
  // (arg0: FastifyRequest, arg1: FastifyReply): PrismaClient
  prisma: PrismaClient
  req: FastifyRequest
  reply: FastifyReply
}
