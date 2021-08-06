import fastify from 'fastify'
import mercurius, {
  IFieldResolver,
  IResolvers,
  MercuriusContext,
} from 'mercurius'
const schema = require('./shema')
// import { context } from './context'

declare module 'mercurius' { }
const server = fastify()

server.register(mercurius, {
  schema,
  graphiql: true,
  // context: () => context
})


server.listen(3000, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`\
  🚀 Server ready at: http://localhost:3000/graphiql
  ⭐️ See sample queries: http://pris.ly/e/ts/graphql-fastify-sdl-first#using-the-graphql-api
  `)
})