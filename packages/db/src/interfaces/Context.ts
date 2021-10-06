import { Session, SessionData} from '@mgcrea/fastify-session'
import { PrismaClient } from '.prisma/client'

export interface PrismaContext {
  prisma: PrismaClient,
  session: Session<SessionData>
}
