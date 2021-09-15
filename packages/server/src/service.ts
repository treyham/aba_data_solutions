import { db } from './plugins'
import AutoLoad, {AutoloadPluginOptions} from 'fastify-autoload'
import { FastifyPluginAsync } from 'fastify'
import { config } from '@app/config'

console.log('appService')
export type AppOptions = {
  // Place your custom options for app below here.
  dbOpts?: db.DbPluginOptions

} & Partial<AutoloadPluginOptions>;

const plugins: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  // Place here your custom code!
  config.constant.intro(config.env.isProd)
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: config.constant.path.server.plugins,
    options: opts
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: config.constant.path.server.routes,
    options: opts
  })
}

export default plugins;
export { plugins }
