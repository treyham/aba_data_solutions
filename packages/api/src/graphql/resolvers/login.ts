import 'reflect-metadata'
import { LoginCreateInput } from '@generated/type-graphql'
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
  @Query(() => String)
  async testing() {
    return 'attention pls'
  }
  @Query(() => String)
  async loginCount(@Ctx() ctx: Context): Promise<number> {
    return await ctx.prisma.login.count()
  }
  @Query(() => Boolean) // TODO fix this; add Employee type to return
  async verifyLoginCreds(
    @Ctx() {req, reply, prisma}: Context,
    @Arg('username', () => String) empUser: string,
    @Arg('password') empPass: string
    ): Promise<boolean> {
      const emp = await prisma.employee.findUnique({
        where: {
          displayName: empUser,
        }
      })
      return await argon2.verify(emp ? emp.password : '', empPass)
  }

  /**
   * @param ctx Context
   * @param createInput LoginCreateInput
   * @returns ```true | false```
   */
  // mutation{createLogin(employeeId:{employee:{connect:{id:"9e1bb9f5-2e13-47f4-afdd-eeda5a4312c4"}}})}
  @Mutation(() => Boolean)
  async createLogin(
    @Ctx() ctx: Context,
    @Arg('employeeId') createInput: LoginCreateInput
  ): Promise<boolean> {

    return !!(await ctx.prisma.login.create({
      data: {
        employee: {
          connect: {
            id: createInput.employee.connect?.id,
          }
        }
      }
    }))
  }
}
