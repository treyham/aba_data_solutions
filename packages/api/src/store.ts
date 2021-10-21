import { PrismaClient } from '.prisma/client';
import { SessionStore, SessionData } from '@mgcrea/fastify-session'
import { EventEmitter } from 'events'

export const DEFAULT_PREFIX = 'sessybaka ^u^ :'
export const ONE_DAY_MS = 86400 * 1000

export class FastPrismaStore<T extends SessionData = SessionData> extends EventEmitter implements SessionStore {
  private readonly prisma: PrismaClient
  private readonly ttl: number
  private readonly prefix: string

  constructor(
    prisma: PrismaClient,
    prefix = DEFAULT_PREFIX,
    ttl = ONE_DAY_MS,
  ) {
    super()
    this.prisma = prisma
    this.prefix = prefix
    this.ttl = ttl
  }

  private readonly getKey = (sessionId: string) => {
    return `${this.prefix}${sessionId}`;
  }

  private readonly getTTL = (expiry?: number | null): number => {
    return expiry ? Math.min(Math.floor((expiry - Date.now()) / 1000), this.ttl) : this.ttl;
  }

  destroy = async ( sid: string ): Promise<void> => { 
    console.log("session destroyed in db: ",
      !!this.prisma.loggedIn.delete({where: { sid: sid }, select: { loginId: true } })
    )
    return
  }

  get = async ( sid: string ): Promise<[SessionData, number | null] | null> => {
    console.warn('session: get')
    const loggedIn = await this.prisma.loggedIn.findUnique({
      where: { sid }, select: { id: true, employeeId: true }
    })
    if (!loggedIn) return null
    const session: SessionData = {
      ['lid']: loggedIn?.id,
      ['eid']: loggedIn?.employeeId
    }
    const expiry = JSON.stringify(this.get('kExpiry'))    // TODO fix expirary
    console.log({ expiry })
    return [session, parseInt(expiry)]
  }

  set = async ( sid: string, data: T, expiry?: number | null ): Promise<void> => {
    const key = this.getKey(sid)
    console.log({ sid })
    return
  }
}