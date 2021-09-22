import { FastifyPluginAsync } from 'fastify'

const api: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/api', async function (request, reply) {
    reply.send('hello youve reached api')
    console.log('/api')
    return reply.getHeader
  })
}

export default api
