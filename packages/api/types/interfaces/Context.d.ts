import { Session, SessionData } from '@mgcrea/fastify-session';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '.prisma/client';
export interface BuildContext {
    (req: FastifyRequest & {
        session: Session<SessionData>;
    }, _reply: FastifyReply): Promise<Context>;
}
export declare type Context = {
    req: FastifyRequest & {
        session: Session<SessionData>;
    };
    reply: FastifyReply;
} & PrismaContext;
export interface PrismaContext {
    prisma: PrismaClient;
    session: Session<SessionData>;
}
export declare type PrismaSession = Session<SessionData>;
