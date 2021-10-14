import 'reflect-metadata';
import { Context } from '@app/api';
import { FastifyReply, FastifyRequest } from 'fastify';
import { FastifyCookieOptions } from 'fastify-cookie';
import { GraphQLSchema } from 'graphql';
declare module 'fastify' {
    interface FastifyRequest {
        PluginProp: PluginOpts;
        AuthProp: AuthOpts;
        DbProp: DbOpts;
    }
    interface FastifyReply {
        PluginProp: PluginOpts;
        AuthProp: AuthOpts;
        DbProp: DbOpts;
    }
}
export interface FastifySessionOpts {
    cookieName: string;
    secret: string;
    cookie: {
        secure: boolean;
    };
}
export interface AuthOpts {
    session: FastifySessionOpts;
    cookie: FastifyCookieOptions;
}
export interface BuildContext {
    (req: FastifyRequest, _reply: FastifyReply): Promise<Context>;
}
export interface MercuriusPluginOpts {
    schema: GraphQLSchema;
    graphiql: boolean;
    ide: boolean;
    path: string;
    context: BuildContext;
}
export interface AltairPluginOpts {
    path: string;
    baseURL: string;
    endpointURL: string;
}
export interface DbOpts {
    MercuriusPluginOpts: MercuriusPluginOpts;
    AltairaPluginOpts: AltairPluginOpts;
}
export interface PluginOpts {
    authOpts: AuthOpts;
    dbOpts: DbOpts;
}
