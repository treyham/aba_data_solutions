import { FastifyPluginAsync } from 'fastify'

const rbt: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/api/rbt', async function (request, reply) {
    return { rbt: true }
  })
}

export default rbt
