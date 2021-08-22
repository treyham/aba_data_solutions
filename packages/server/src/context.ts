import * as Prisma from '@prisma/client'
const prisma = new Prisma.PrismaClient()

export interface Context {
  prisma: Prisma.PrismaClient
}

export const context: Context = {
  prisma: prisma
}
