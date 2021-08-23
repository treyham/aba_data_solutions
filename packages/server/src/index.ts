import fastify from 'fastify'
import mercurius, {
  IFieldResolver,
  IResolvers,
  MercuriusContext,
} from 'mercurius'
import { schema } from './shema.js'
import { context } from './context.js'
import { prisma } from '../../../node_modules/.prisma/client'


declare module 'mercurius' { }

async function main() {
  const server = fastify()
  const dbPort = 3000
  const __prod__ = false
  console.log(`Dev: ${!__prod__}`)
  server.register(mercurius, {
    schema,
    graphiql: !__prod__,
    context: () => ({ prisma })                     // provide the prisma instance to the context
  })
  
  server.listen(dbPort, () => {
    console.log(`
    🚀 Server ready at: http://localhost:${dbPort}/graphiql
    ⭐️ See sample queries: http://pris.ly/e/ts/graphql-fastify-sdl-first#using-the-graphql-api
    `)
  })
}
main()
.catch(console.error)


// watch ben's vid on how to do the ts compile stuff
// right now if it breaks when you save just save again