import { FastifyInstance } from 'fastify';
import { AutoloadPluginOptions } from 'fastify-autoload';
import { AuthOpts, BuildContext, DbOpts } from './interfaces';
declare const buildContext: BuildContext;
declare type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;
declare module 'mercurius' {
    interface MercuriusContext extends PromiseType<ReturnType<typeof buildContext>> {
    }
}
export declare type PluginOpts = {
    authOpts: AuthOpts;
    dbOpts: DbOpts;
} & Partial<AutoloadPluginOptions>;
export declare const pluginOpts: PluginOpts;
export declare const root: (fastify: FastifyInstance, opts: PluginOpts) => Promise<void>;
export {};
