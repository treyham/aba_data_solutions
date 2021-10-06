import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { prisma } from '../src'


// export const sessionStore = new PrismaSessionStore(
//   prisma,
//   {
//     checkPeriod: 2 * 60 * 1000,  //ms
//     dbRecordIdIsSessionId: true,
//     dbRecordIdFunction: undefined,
//   }
// )