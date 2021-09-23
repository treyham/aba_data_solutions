import { schema } from '@app/api'
import { config } from '@app/config'
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload'
import { AuthOpts, BuildContext, DbOpts, ValidOpts } from './types'

export type PluginOpts = {
  // Place your custom options for app below here.
  authOpts: AuthOpts
  dbOpts: DbOpts
  validOpts: ValidOpts
} & Partial<AutoloadPluginOptions>

const buildContext: BuildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
  return {
    authorization: req.headers//.authorization
  }
}


type PromiseType<T> = T extends PromiseLike<infer U> ? U : T

declare module 'mercurius' {
  interface MercuriusContext extends PromiseType<ReturnType<typeof buildContext>> {}
}

export const pluginOpts: PluginOpts = {
  authOpts: {
    cookie: {},
    session: {
      saveUninitialized: true,
      secret: config.env.sessionSecret,
      cookie: {
        secret: config.env.cookieSecret
      }
    }
  },
  dbOpts: {
    AltairaPluginOpts: {
      path: '/altair',
      baseURL: '/altair',
      endpointURL: '/api',
    },
    MercuriusPluginOpts: {
      schema,
      graphiql: false,
      ide: false,
      path: '/api',
      context: buildContext,
      // context: context
      // https://mercurius.dev/#/docs/typescript?id=manually-typing
    }
  },
  validOpts: {

  }
}

const plugin = async (fastify: FastifyInstance, opts: PluginOpts) => {
  // Place here your custom code!
  config.intro(config.isProd)
  fastify.decorate<AuthOpts>('auth', opts.authOpts)
  fastify.decorate<DbOpts>('db', opts.dbOpts)
  fastify.decorate<ValidOpts>('validator', opts.validOpts)
  // fastify.decorate('cookie', opts.authOpts.cookie)
  // fastify.decorate('session', opts.authOpts.session)

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
