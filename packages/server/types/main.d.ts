/// <reference types="node" />
import { IncomingMessage, Server, ServerResponse } from 'http';
declare module 'fastify' {
    const server: FastifyInstance<Server, IncomingMessage, ServerResponse>;
}
