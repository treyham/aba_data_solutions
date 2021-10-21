import { PrismaClient } from '.prisma/client';
import { SessionStore, SessionData } from '@mgcrea/fastify-session'
import { EventEmitter } from 'events'
import { stringify } from 'querystring';

export const DEFAULT_PREFIX = 'sess:'
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

  async destroy (
    sid: string,
  ): Promise<void> { 
    console.warn('session: destroy; sid: ', sid)
    // remove session(s) from loggedIn
    const res = this.prisma.loggedIn.delete({where: { sid: sid }, select: { loginId: true } })
    console.log("session destroyed in db: ", !!res)
    return
  }

  async get (
    sid: string
  ): Promise<[SessionData, number | null] | null> {
    console.warn('session: get')
    // get session with id
    const loggedIn = await this.prisma.loggedIn.findUnique({
      where: { sid }, select: { id: true, employeeId: true }
    })
    console.log({ loggedIn })
    if (!loggedIn) return null
    const session: SessionData = {
      ['lid']: loggedIn?.id,
      ['eid']: loggedIn?.employeeId
    }
    // const ttl = this.ttl
    // console.log({ ttl })
    // const expirary = this.getTTL(this.ttl)
    const expiry = JSON.stringify(this.get('kExpiry'))
    console.log({ expiry })
    return [session, parseInt(expiry)]
  }

  async set (
    sid: string, 
    data: SessionData, 
    expiry?: number | null
  ): Promise<void> {

    
    return
  }



}