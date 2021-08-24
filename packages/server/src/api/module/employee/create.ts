import { Context } from './../../../../types/src/context.d';
import "reflect-metadata"
import * as bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
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
  async hello() {
    return "world"
  }

  

  @Mutation(() => String)
  async createEmployee(
    @Ctx() ctx: Context,
    @Arg('fullname') fullName: string,
    @Arg('displayName') displayName: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('birthdate') birthdate: string,
    @Arg('tempPosition') tempPosition: string
    //   @Arg('created_at') created_at: string,
    //   @Arg('updated_at') updated_at: string,
  ) {
    const hashedPass = await bcrypt.hash(password, 'temp')
    // const newEmployee = await ctx.prisma.employee.create()
    return fullName
  }
}