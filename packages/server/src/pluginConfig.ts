import { BuildContext, Context, schema } from '@app/api'
import { config } from '@app/config'
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify'
import AutoLoad from 'fastify-autoload'
import fp from 'fastify-plugin'
import { authOpts, dbOpts } from './helpers'
import { PluginOpts } from './interfaces'

export const opts: PluginOpts & FastifyPluginOptions = { authOpts, dbOpts }

const plugin = fp(async (fastify: FastifyInstance, opts: FastifyPluginOptions):Promise<void> => {
  // Place here your custom code!\

  // load plugins 
  return await fastify
    // .decorate('config', config)
    .register(AutoLoad, {
      dir: config.path.server.plugins,
      // options: fastify.config,

    })
    // load route plugins
    .register(AutoLoad, {
      dir: config.path.server.routes,
      // options: fastify.config
    })
},
{
  name: 'main'
})

export default plugin
export { plugin }
