import { PrismaClient } from '.prisma/client'

const context = new PrismaClient()
//  runs when Prisma is triggered externally (e.g. via a ```SIGINT``` signal) to shut down
context.$on('beforeExit', async () => {
  console.log('Prisma beforeExit hook')
  // PrismaClient still available
})

export const prisma = context