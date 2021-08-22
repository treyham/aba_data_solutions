//import { resolvers } from './../api/type-graphql/generated/index';
import { makeExecutableSchema } from '@graphql-tools/schema'
// import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'
import {
  Resolver,
  Query,
  buildSchema,
  FieldResolver,
  Ctx,
  Root,
} from "type-graphql"
import {
  resolvers,
  Employee,
  EmployeeRelationsResolver,
  FindUniqueEmployeeResolver,

} from './../api/type-graphql/generated';

@Resolver()
class CustomEmployeeResolver {
  async test() {
    return "world"
  }
}


// const Query = require('./resolvers/query')
// const Mutation = require('./resolvers/mutation')

const typeDefs = `
  type Query {
    hello: String
  }  
`

// const resolvers = {
//   Query: {
//     hello: () => 'world'
//   }
// }

export const schema = await buildSchema({
  resolvers: [
    ...resolvers,
    CustomEmployeeResolver
  ]
})