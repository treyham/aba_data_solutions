import 'reflect-metadata'
import { LoginCreateInput } from '@generated/type-graphql'
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

  /**
   * @param ctx Context
   * @param createInput
   * @returns ```true | false```
   */
  @Mutation(() => Boolean)
  async createLogin(
    @Ctx() ctx: Context,
    @Arg('employeeId') createInput: LoginCreateInput
  ): Promise<boolean> {

    return !!(await ctx.prisma.login.create({
      data: {
        employee: {
          connect: {
            id: createInput.employee.connect?.id
          }
        }
      }
    }))
  }
}
