/// <reference types="node" />
import { PrismaClient } from '.prisma/client';
import { SessionStore, SessionData } from '@mgcrea/fastify-session';
import { EventEmitter } from 'events';
export declare const DEFAULT_PREFIX = "sess:";
export declare const DEFAULT_TTL = 86400;
export declare class FastPrismaStore<T extends SessionData = SessionData> extends EventEmitter implements SessionStore {
    private readonly prisma;
    private readonly ttl;
    private readonly prefix;
    constructor(prisma: PrismaClient, prefix?: string, ttl?: number);
    private readonly getKey;
    private readonly getTTL;
    readonly destroy: (sid: string | string[]) => Promise<void>;
    readonly get: (sid: string | string[]) => Promise<[SessionData, number | null] | null>;
    readonly set: () => Promise<void>;
}
