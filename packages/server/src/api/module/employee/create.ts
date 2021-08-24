import { EmployeeCreateInput } from '../../../../node_modules/@generated/type-graphql';
import { Context } from './../../../../types/src/context.d'
import "reflect-metadata"
import * as bcrypt from 'bcryptjs'
import { Prisma } from 'packages/server/node_modules/.prisma/client'

import {
    Resolver,
    Query,
    Mutation,
    Arg,
    FieldResolver,
    Ctx,
    Root,
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
  ): Promise<number> {
    return await ctx.prisma.employee.count()
  }

  /**
   * ```
   * mutation {
   *   employeeCreate(employeeInput: {
   *   fullName: "",
   *   displayName: "",
   *   password: "",
   *   position: ADMIN
   *   })
   * }
   * ```
   * @param ctx 
   * @param employee 
   * @returns ```true | false```
   */
  @Mutation(() => Boolean)
  async employeeCreate(
    @Ctx() ctx: Context,
    @Arg("employeeInput") employeeInput: EmployeeCreateInput
  ): Promise<boolean> {
    // temporarally encrypt password here until we can do it sooner
    // const encryptedPass = await bcrypt.hash(employee.password, "tempSalt")
    // employee.password = encryptedPass
    const isCreated = await ctx.prisma.employee.create({
      data: {
        fullName: employeeInput.fullName,
        displayName: employeeInput.displayName,
        password: employeeInput.password,
        position: employeeInput.position
      }
    })
    return !!isCreated
  }
}