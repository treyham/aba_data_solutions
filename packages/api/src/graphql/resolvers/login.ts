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
  Authorized,
  ObjectType,
  Field
} from 'type-graphql'


@Resolver()
export class EmployeeLoginResolver {
  @Query(() => Boolean)
  async isLoggedIn(
    @Ctx() ctx: Context,
    @Arg('employeeId') employeeId: string,
  ): Promise<boolean> { 
    return await ctx.prisma.loggedIn.count({
      where: {
        login: { employeeId: employeeId }
      }
    }) !== 0 ? true : false
  }

  @Mutation(() => String) // TODO fix this, retunr error instead of undefined
  async employeeLogin(
    @Ctx() ctx: Context,
    @Arg('displayName', () => String) empDispName: string,
    @Arg('password') empPass: string
    ): Promise<string | undefined> {
      const emp = await ctx.prisma.employee.findUnique({
        where: {
          displayName: empDispName,
        }
      })
      // TODO set cookie to sessionId
      const sess =  ctx.req.session
      sess.set('key', 'value')
      console.log({sess})
      // {
      //   sess: Session {
      //     created: true,
      //     rotated: false,
      //     changed: true,
      //     deleted: false,
      //     id: 'SsLAJi_Le1M-N4dOtPrHM',
      //     [Symbol(kSessionData)]: { key: 'value' },
      //     [Symbol(kCookieOptions)]: {
      //       httpOnly: true,
      //       secure: false,
      //       expires: 2021-10-05T05:20:56.517Z,
      //       path: '/'
      //     },
      //     [Symbol(kExpiry)]: 1633411256517
      //   }
      // }
      return await argon2.verify(emp ? emp.password : '', empPass)  
        ? this.createLogin(ctx, emp!.id)
        : undefined // TODO return error here 
  }

  /**
   * @param ctx Context
   * @param createInput LoginCreateInput
   * @returns ```true | false```
   */
  @Mutation(() => String)
  async createLogin(
    @Ctx() ctx: Context,
    @Arg('employeeId') employeeId: string
  ): Promise<string | undefined> {
    if (await this.isLoggedIn(ctx, employeeId)) {
      console.warn('this person is already loggedin!!')
      return undefined
    }
    const { id } = await ctx.prisma.login.create({
      data: {
        employee: {
          connect: {
            id: employeeId
          }
        }
      },
      select: { id: true }
    })
    const { loginId } = await ctx.prisma.loggedIn.create({
      data: {
        login: {
          connect: { id }
        }
      },
      select: { loginId: true }
    })
    // TODO sort out returns
    return loginId
}

  @Mutation(() => Boolean)
  async logout(
    @Ctx() ctx: Context,
    @Arg('employeeId') employeeId: string
  ): Promise<boolean> {
     // update logged out time on login
     await ctx.prisma.login.update({
      where: {
        
      },
      data: {
        logoutTime: new Date()
      }
    })
    // delete from LoggedIn
    const login = await ctx.prisma.loggedIn.delete({
      where: { employeeId },
      select: {loginId: true}
    })
    return true
  }
}
