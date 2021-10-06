import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import expressSession from 'express-session'
import { prisma } from './prisma'

export const store = new PrismaSessionStore(
  prisma,
  {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }
)

export type Store = typeof store