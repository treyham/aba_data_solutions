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

const employee: Prisma.EmployeeCreateInput = {
  fullName: "", 
  displayName: "", 
  password: await bcrypt.hash("password", "tempHash"), 
  position: "ADMIN"
}

@Resolver()
export class CreateEmployeeResolver {
  @Query(() => String)
  async testing() {
    return "attention pls"
  }

  @Query(() => String)
  async employeeCount(
    @Ctx() ctx: Context,
  ): Promise<number> {
    return await ctx.prisma.employee.count()
  }

  @Mutation(() => Boolean)
  async employeeCreate(
    @Ctx() ctx: Context,
    @Arg("employeeInput") EmployeeInput: Prisma.EmployeeCreateInput
  ): Promise<boolean> {
    // temporarally encrypt password here until we can do it sooner
    EmployeeInput.password = await bcrypt.hash(EmployeeInput.password, "tempSalt")
    const isCreated = ctx.prisma.employee.create({
      data: {
        ...EmployeeInput
        // fullName: employee.fullName,
        // displayName: employee.displayName,
        // password: employee.password,
        // tempPosition: employee.tempPosition,
        // position: employee.position
      }
    })
    return !!isCreated
  }
}