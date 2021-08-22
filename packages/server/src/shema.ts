//import { resolvers } from './../api/type-graphql/generated/index';
import { makeExecutableSchema } from '@graphql-tools/schema'
// import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'


// const Query = require('./resolvers/query')
// const Mutation = require('./resolvers/mutation')

const typeDefs = `
  type Query {
    hello: String
  }  
`

const resolvers = {
  Query: {
    hello: () => 'world'
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})