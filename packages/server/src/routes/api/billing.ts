import { FastifyPluginAsync } from 'fastify'

const billing: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/api/billing', async function (request, reply) {
    return { billing: true }
  })
}

export default billing
