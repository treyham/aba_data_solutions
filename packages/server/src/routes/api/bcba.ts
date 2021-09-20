import { FastifyPluginAsync } from 'fastify'

const billing: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return { bcba: true }
  })
}

export default billing
