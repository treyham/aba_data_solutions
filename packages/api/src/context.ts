import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaClient } from '.prisma/client'
import { Context } from './interfaces'
const prisma = new PrismaClient()

export const context: Context = {
  prisma
}

export interface PrismaContext {
  (request: FastifyRequest, reply: FastifyReply): Context
}

// export const context: Context = (request, reply) => {return prisma}
/**
 * ## exit hook
 * The ```beforeExit``` hook runs when Prisma is triggered externally
 * (e.g. via a ```SIGINT``` signal) to shut down, and allows you to run
 * code before the Client disconnects - for example, to issue
 * queries as part of a graceful shutdown of a service:
 *
 */
// prisma.$on('beforeExit', async () => {
//   console.log('beforeExit hook')
//   // PrismaClient still available
//   await prisma.message.create({
//     data: {
//       message: 'Shutting down server',
//     },
//   })
// })
