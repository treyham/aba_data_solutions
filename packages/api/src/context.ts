import { PrismaClient } from '.prisma/client'
export const context = new PrismaClient()
context.$on('beforeExit', async () => {
  console.log('Prisma beforeExit hook')
  // PrismaClient still available
})

// TODO could turn prisma into a plugin https://www.prisma.io/blog/backend-prisma-typescript-orm-with-postgresql-rest-api-validation-dcba1ps7kip3
export const prisma = {
  context,
}
/**
 * ## exit hook
 * The ```beforeExit``` hook runs when Prisma is triggered externally
 * (e.g. via a ```SIGINT``` signal) to shut down, and allows you to run
 * code before the Client disconnects - for example, to issue
 * queries as part of a graceful shutdown of a service:
 *
 */


