import 'reflect-metadata'
import argon2 from 'argon2'
import { Context } from '../../interfaces'
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
import { Employee } from '.prisma/client'

@Resolver()
export class CustomLoginResolver {
  @Mutation(() => Boolean) // TODO fix this; add Employee type to return or FieldError
  async verifyLoginCreds(
    @Ctx() ctx: Context,
    @Arg('username', () => String) empUser: string,
    @Arg('password') empPass: string
    ): Promise<boolean> {
      const emp = await ctx.prisma.employee.findUnique({
        where: {
          displayName: empUser,
        }
      })
      return await argon2.verify(emp ? emp.password : '', empPass)  
        ? this.createLogin(ctx, emp!.id)
        : false // TODO return error here probably 
  }
  /**
   * @param ctx Context
   * @param createInput LoginCreateInput
   * @returns ```true | false```
   */
  @Mutation(() => Boolean)
  async createLogin(
    @Ctx() ctx: Context,
    @Arg('employeeId') employeeId: string
  ): Promise<boolean> {
    return !!(await ctx.prisma.login.create({
      data: {
        employee: {
          connect: {
            id: employeeId
          }
        }
      }
    }))
  }
}
