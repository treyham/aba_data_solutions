import { BuildContext, Context, prisma, schema } from '@app/api'
import { FastifyReply, FastifyRequest} from 'fastify'

const buildContext: BuildContext = async (
  req: FastifyRequest,
  _reply: FastifyReply
): Promise<Context> => {
  try {
    
  } catch (err) {
    console.warn('Auth Failed')
  }
  console.log('in buildContext: inserting session into context')
  return {
    req,
    reply: _reply,
    prisma,
    session: req.session
  }
}

export const dbOpts = {
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