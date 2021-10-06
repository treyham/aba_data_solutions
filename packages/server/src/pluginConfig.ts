import { BuildContext, Context, prisma, schema } from '@app/api'
import { config } from '@app/config'
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify'
import AutoLoad from 'fastify-autoload'
import fp from 'fastify-plugin'
import { PluginOpts } from './interfaces'

const buildContext: BuildContext = async (
  req: FastifyRequest,
  _reply: FastifyReply
): Promise<Context> => {

  try {
    
  } catch (err) {
    console.warn('Auth Failed')
  }
  console.log('inserting session into context')
  return {
    req,
    reply: _reply,
    prisma,
    session: req.session
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
      saveUninitialized: config.session.saveUninitialized,
      // store
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
