import { PrismaClient } from '.prisma/client';
import { SessionStore, SessionData } from '@mgcrea/fastify-session'
import { EventEmitter } from 'events'
import { timeDiff } from './utils'

export const DEFAULT_PREFIX = 'sessybaka^u^:'
export const HALF_DAY_S = 86400/2

export class FastPrismaStore<T extends SessionData = SessionData> extends EventEmitter implements SessionStore {
  private readonly prisma: PrismaClient
  private readonly ttl: number                                                  // time to live 
  private readonly prefix: string

  constructor(
    prisma: PrismaClient,
    prefix = DEFAULT_PREFIX,
    ttl = HALF_DAY_S,
  ) {
    super()
    this.prisma = prisma
    this.prefix = prefix
    this.ttl = ttl
  }

  private readonly getKey = (sid: string) => {
    return `${this.prefix}${sid}`
  }

  private readonly getTTL = (expiry?: number | null): number => {
    return expiry ? Math.min(Math.floor((expiry - Date.now()) / 1000), this.ttl) : this.ttl
  }

  private readonly isExpired = (inTime: Date, exp: number): boolean => {
    const now = new Date()
    const {date, time} = timeDiff(now, inTime)
    if (date.day !== 0 || date.month !== 0 || date.year !== 0) return false
    const test = { hours: 7, mins: 38, secs: 56}
    const testSum = test.secs + test.mins * 60 + test.hours * 60**2
    console.log({ testSum })
    const sum = time.secs + time.mins * 60 + time.hours * 60**2

    return false

  }

  destroy = async ( sid: string ): Promise<void> => { 
    this.prisma.loggedIn.delete({where: { sid: sid }, select: { loginId: true } })
    const key = this.getKey(sid)
    const ttl = this.ttl
    console.log({ key, ttl })
  }

  get = async ( sid: string ): Promise<[SessionData, number | null] | null> => {
    console.warn('session: get')
    // const key = this.getKey(sid)
    const loggedIn = await this.prisma.loggedIn.findUnique({
      where: { sid },
      select: { id: true, employeeId: true, 
        login: {
          select: { loginTime: true }
        }}
    })
    // const expired = this.isExpired(loggedIn!.login.loginTime, this.ttl)
    // console.log(`session expired: ${ expired }`)
    // if (!loggedIn || this.isExpired(loggedIn?.login.loginTime, this.ttl)) return null
    const session: SessionData = {
      ['lid']: loggedIn?.id,
      ['eid']: loggedIn?.employeeId
    }
    const expiry = 0
    // const expiry = parseInt(JSON.stringify(this.get('kExpiry')))                          // TODO fix expirary
    return [session, expiry]
  }

  set = async ( sid: string, data: T, expiry?: number | null ): Promise<void> => {
    const key = this.getKey(sid)
    const ttl = this.getTTL(expiry)
    console.log({ key, ttl })
    return
  }
}