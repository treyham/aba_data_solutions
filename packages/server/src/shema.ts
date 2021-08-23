import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { CreateEmployeeResolver } from './api/module/employee/create';
import { Context } from './context'


export const schema = await buildSchema({
  resolvers: [
    CreateEmployeeResolver,
  ]
})