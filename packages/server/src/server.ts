import fastify from 'fastify'
import mercurius, {
  IFieldResolver,
  IResolvers,
  MercuriusContext,
} from 'mercurius'
import { schema } from './shema.js'
import { context } from './context.js'

declare module 'mercurius' { }
const server = fastify()

server.register(mercurius, {
  schema,
  graphiql: true,
  context: () => context
})

const dbPort = 3000

server.listen(dbPort, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`
  🚀 Server ready at: http://localhost:${dbPort}/graphiql
  ⭐️ See sample queries: http://pris.ly/e/ts/graphql-fastify-sdl-first#using-the-graphql-api
  `)
})

// watch ben's vid on how to do the ts compile stuff
// right now if it breaks when you save just save again