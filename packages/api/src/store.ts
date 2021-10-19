import { PrismaClient } from '.prisma/client';
import { SessionStore, SessionData } from '@mgcrea/fastify-session'
import { EventEmitter } from 'events'

export const DEFAULT_PREFIX = 'sess:'
export const DEFAULT_TTL = 86400

export class FastPrismaStore<T extends SessionData = SessionData> extends EventEmitter implements SessionStore {
  private readonly prisma: PrismaClient
  private readonly ttl: number
  private readonly prefix: string
  constructor(
    prisma: PrismaClient,
    prefix = DEFAULT_PREFIX,
    ttl = DEFAULT_TTL,
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

  public readonly destroy = async (
    sid: string | string[]
  ) => {
    console.warn('session: destroy')
    // remove employee from loggedIn
    
    // change login status to 'logged out'
  }

  public readonly get = async (
    sid: string | string[]
  ): Promise<[SessionData, number | null] | null> => {
    console.warn('session: get')
    // get session with id
    const session = {} as SessionData
    return [session, 1]
  }

  public readonly set = async (

  ) => {
    console.warn('session: set')
  }
}