import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { Context } from './context'
import { CreateEmployeeResolver } from './api/module/employee/create'

export const schema = await buildSchema({
  resolvers: [
    // ...resolvers,
    CreateEmployeeResolver,
  ]
})