import { PrismaClient } from '../node_modules/.prisma/client'
const prisma = new PrismaClient()

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

export interface Context {
  prisma: PrismaClient
}

export const context: Context = {
  prisma: prisma
}
