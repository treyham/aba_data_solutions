import { addHours } from './utils/time';
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
    console.log('TTL', { expiry })
    return expiry ? Math.min(Math.floor((expiry - Date.now()) / 1000), this.ttl) : this.ttl
  }

  private readonly isExpired = ( inTime: Date, exp: number ): boolean => {
    const now = new Date()
    const { date, time } = timeDiff(now, inTime)
    if ( date.day !== 0 || date.month !== 0 || date.year !== 0 ) return false
    const test = { hours: 7, mins: 38, secs: 56}
    const testSum = test.secs + test.mins * 60 + test.hours * 60**2
    console.log({ testSum })
    const sum = time.secs + time.mins * 60 + time.hours * 60**2

    return false
  }

  destroy = async (sid: string): Promise<void> => { 
    this.prisma.loggedIn.delete({ where: { sid: sid }, select: { loginId: true } })
    const key = this.getKey(sid)
    const ttl = this.getTTL(this.ttl)
    console.log({ key, ttl })
  }

  get = async (sid: string): Promise<[SessionData, number | null] | null> => {
    console.log('session: get')
    
    const loggedIn = await this.prisma.loggedIn.findUnique({
      where: { sid },
      select: { id: true, employeeId: true, ttl: true, data: true,
        login: {
          select: {
            loginTime: true,
            employee: {
              select: { position: true }
            }
          }
        }
      }
    })
    const loginTime = loggedIn?.login.loginTime!
    const expiry = new Date(loginTime.getTime() + ( this.ttl * 1000 ))
    const key = this.getKey(sid)
    const ttl = this.getTTL(loggedIn?.ttl) 
    console.log({ key, ttl, expiry })
    console.log('data: \n\t', loggedIn?.data)
    const session: SessionData = JSON.parse(loggedIn?.data ?? '') 

    return [ session, expiry.getTime() ]
  }

  set = async (sid: string, data: T, expiry?: number | null): Promise<void> => {
    console.log('session set')
    const key = this.getKey(sid)
    const loggedIn = await this.prisma.loggedIn.update({
      where: { sid }, 
      data: { 
        ttl: this.getTTL(expiry),
        data: JSON.stringify(data)
      },
      select: {
        ttl: true,
        data: true
      }
    })
    const ttl = loggedIn.ttl
    const sessionData = JSON.parse(loggedIn.data ?? '')
    console.log({ key, ttl, sessionData })
    return
  }
}