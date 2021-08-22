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
  async createEmployee() {
    return "ok time to create an employee"
  }
}


export const schema = await buildSchema({
  resolvers: [
    ...resolvers,
    CustomEmployeeResolver
  ]
})