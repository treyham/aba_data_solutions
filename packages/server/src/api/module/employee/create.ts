import { Context } from './../../../../types/src/context.d';
import "reflect-metadata"
import * as bcrypt from 'bcryptjs'
import { Prisma } from '@prisma/client'
import {
    Resolver,
    Query,
    Mutation,
    Arg,
    // buildSchema,
    // FieldResolver,
    Ctx,
    // Root,
  } from "type-graphql"
  

@Resolver()
export class CreateEmployeeResolver {
  @Query(() => String)
  async testing() {
    return "attention pls"
  }

  @Query(() => String)
  async employeeCount(
    @Ctx() ctx: Context,
  ):Promise<number> {
    return await ctx.prisma.employee.count()
  }
}