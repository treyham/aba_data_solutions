import 'reflect-metadata'
import { Employee, EmployeeCreateInput } from '@generated/type-graphql'
import { Context } from '../../interfaces'
import argon2 from 'argon2'
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Ctx,
  Root,
  Authorized
} from 'type-graphql'

@Resolver()
export class CreateEmployeeResolver {
  @Query(() => Employee)
  // return current logged in employee
  async me(@Ctx() ctx: Context):Promise<Employee | null> {
    return await ctx.prisma.employee.findFirst({
      where: {
        
      }
    })
  }

  @Query(() => String)
  async employeeCount(@Ctx() ctx: Context): Promise<number> {
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
    @Arg('createInput') createInput: EmployeeCreateInput
  ): Promise<boolean> {
    console.log('password: ', createInput.password)
    // temporarally encrypt password here until we can do it sooner
    const encryptedPass = await argon2.hash(createInput.password)
    // const encryptedPass = employeeInput.password
    console.log('encryptedPassword: ', encryptedPass)
    return !!(await ctx.prisma.employee.create({
      data: {
        fullName: createInput.fullName,
        displayName: createInput.displayName,
        password: encryptedPass,
        position: createInput.position
      }
    }))
  }
}
