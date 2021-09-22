import { config } from '@app/config'
import session from '@fastify/session'
import { FastifyInstance } from 'fastify'
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload'
import cookie from 'fastify-cookie'
import { AuthOpts, DbOpts, ValidOpts } from './types'

export type pluginOpts = {
  // Place your custom options for app below here.
  authOpts: AuthOpts
  dbOpts: DbOpts
  validOpts: ValidOpts
} & Partial<AutoloadPluginOptions>

const plugin = async (fastify: FastifyInstance, opts: pluginOpts) => {
  // Place here your custom code!
  config.intro(config.isProd)
  fastify.decorate<AuthOpts>('auth', opts.authOpts)
  fastify.decorate<DbOpts>('db', opts.dbOpts)
  fastify.decorate<ValidOpts>('validator', opts.validOpts)
  fastify.decorate('cookie', opts.authOpts.cookie)
  fastify.decorate('session', opts.authOpts.session)

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
