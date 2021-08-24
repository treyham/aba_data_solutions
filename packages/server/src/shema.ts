import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { CreateEmployeeResolver } from './api/module/employee/create'
// import { resolvers } from "@generated/type-graphql"

export const schema = await buildSchema({
  resolvers: [
    CreateEmployeeResolver,
  ]
})