// import { EmployeeRelationsResolver } from './../api/type-graphql/generated/resolvers/relations/Employee/EmployeeRelationsResolver';
//import { resolvers } from './../api/type-graphql/generated/index';
import { makeExecutableSchema } from '@graphql-tools/schema'
// import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'
import "reflect-metadata"
import {
  Resolver,
  Query,
  buildSchema,
  FieldResolver,
  Ctx,
  Root,
} from "type-graphql"

@Resolver()
class CustomEmployeeResolver {
  @Query(() => String)
  async createEmployee() {
    return "ok time to create an employee"
  }
}


export const schema = await buildSchema({
  resolvers: [
    CustomEmployeeResolver,
  ]
})