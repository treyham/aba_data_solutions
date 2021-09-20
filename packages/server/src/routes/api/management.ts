import { FastifyPluginAsync } from 'fastify'

const management: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/api/management', async function (request, reply) {
    return { management: true }
  })
}

export default management
