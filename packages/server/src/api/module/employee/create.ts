import "reflect-metadata"
import { EmployeeCreateInput } from '@generated/type-graphql';
import { Context } from './../../../../types/src/context.d'
import argon2 from 'argon2'

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
   * @param ctx ```ctx.prisma```
   * @param employeeInput```{
   *   fullName: string,
   *   displayName: string,
   *   password: string,
   *   position: enum
   * }```
   * @returns ```true | false```
   */
  @Mutation(() => Boolean)
  async createEmployeeEncryptPass(
    @Ctx() ctx: Context,
    @Arg("employeeInput") employeeInput: EmployeeCreateInput
  ): Promise<boolean> {
    console.log('password: ', employeeInput.password)
    // temporarally encrypt password here until we can do it sooner
    const encryptedPass = await argon2.hash(employeeInput.password)
    // const encryptedPass = employeeInput.password
    console.log('encryptedPassword: ', encryptedPass)
    const isCreated = await ctx.prisma.employee.create({
      data: {
        fullName: employeeInput.fullName,
        displayName: employeeInput.displayName,
        password: encryptedPass,
        position: employeeInput.position
      }
    })
    return !!isCreated
  }
}