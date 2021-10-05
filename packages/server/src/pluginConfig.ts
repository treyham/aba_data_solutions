import { schema, prisma, Context } from '@app/api'
import { config } from '@app/config'
import { FastifyInstance, FastifyRequest, FastifyReply, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import AutoLoad from 'fastify-autoload'
import { AuthPlugOpts, AuthPropOpts, BuildContext, DbPlugOpts, DbPropOpts, PluginOpts } from './interfaces'

const buildContext: BuildContext = async (
  req: FastifyRequest,
  _reply: FastifyReply
): Promise<Context> => {
  try {
    
  } catch (err) {
    console.warn('Auth Failed')
  }
  return {
    req,
    reply: _reply,
    prisma: prisma.context
  }
}

export const opts: PluginOpts = {
  authOpts: {
    session: {
      cookieName: config.session.cookie.name,
      secret: config.env.sessionSecret,
      cookie: {
        httpOnly: config.session.cookie.httpOnly,
        secure: config.isProd,
        expires: config.session.cookie.expires
      },
      saveUninitialized: config.session.saveUninitialized
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


const plugin = fp(async (fastify: FastifyInstance, opts: FastifyPluginOptions):Promise<void> => {
  // Place here your custom code!\
  // fastify.decorate('config', config)
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
