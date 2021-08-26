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
   * @param ctx Context
   * @param createInput 
   * @returns ```true | false```
   */
  @Mutation(() => Boolean)
  async createEmployeeEncryptPass(
    @Ctx() ctx: Context,
    @Arg("createInput") createInput: EmployeeCreateInput
  ): Promise<boolean> {
    console.log('password: ', createInput.password)
    // temporarally encrypt password here until we can do it sooner
    const encryptedPass = await argon2.hash(createInput.password)
    // const encryptedPass = employeeInput.password
    console.log('encryptedPassword: ', encryptedPass)
    const isCreated = await ctx.prisma.employee.create({
      data: {
        fullName: createInput.fullName,
        displayName: createInput.displayName,
        password: encryptedPass,
        position: createInput.position
      }
    })
    return !!isCreated
  }
}