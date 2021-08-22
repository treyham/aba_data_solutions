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
  Employee,
  EmployeeRelationsResolver,
  FindUniqueEmployeeResolver,
} from './../api/type-graphql/generated';

@Resolver()
class CustomEmployeeResolver {
  async test() {
    return "testing 123"
  }
}


export const schema = await buildSchema({
  resolvers: [
    CustomEmployeeResolver
  ]
})