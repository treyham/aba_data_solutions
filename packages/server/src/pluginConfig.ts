import { schema, prisma, Context } from '@app/api'
import { config } from '@app/config'
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload'
import { AuthOpts, BuildContext, DbOpts } from './interfaces'

const buildContext: BuildContext = async (
  req: FastifyRequest,
  _reply: FastifyReply
): Promise<Context> => {
  return {
    req,
    reply: _reply,
    prisma
  }
}

export type PluginOpts = {
  // Place your custom options for app below here.
  authOpts: AuthOpts
  dbOpts: DbOpts
} & Partial<AutoloadPluginOptions>

export const pluginOpts: PluginOpts = {
  authOpts: {
    cookie: {},
    session: {
      cookieName: config.myCookie.name,
      secret: config.env.sessionSecret,
      cookie: { secure: config.isProd }
    }
  },
  dbOpts: {
    AltairaPluginOpts: {
      path: '/altair',
      baseURL: '/altair/',
      endpointURL: '/api'
    },
    MercuriusPluginOpts: {
      schema,
      graphiql: false,
      ide: false,
      path: '/api',
      context: buildContext // https://mercurius.dev/#/docs/typescript?id=manually-typing
    }
  }
}

const plugin = async (fastify: FastifyInstance, opts: PluginOpts) => {
  // Place here your custom code!
  fastify.decorate<AuthOpts>('auth', opts.authOpts)
  fastify.decorate<DbOpts>('db', opts.dbOpts)

  // Do not touch the following lines
  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: config.path.server.plugins,
    options: opts
  })
  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: config.path.server.routes,
    options: opts
  })
}

export default plugin
export { plugin }
