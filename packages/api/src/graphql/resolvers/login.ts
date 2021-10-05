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
  Field,
  Int
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
// login
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
    console.log('key', sess.get('key'))
    console.log({sess})
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
  // login table
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
  // loggedIn table
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
// logout
  @Mutation(() => String)
  async logout(
    @Ctx() ctx: Context,
    @Arg('employeeId') employeeId: string
  ): Promise<string | undefined> {
    // delete from loggedIn table
  const { loginId } = await ctx.prisma.loggedIn.delete({
    where: { employeeId },
    select: { loginId: true }
  })
  // update logged out time on login table
  const { loginTime, logoutTime } = await ctx.prisma.login.update({
    where: {
      id: loginId
    },
    data: {
      logoutTime: new Date()
    },
    select: {
      loginTime: true,
      logoutTime: true
    }
  })
  // return amount of seconds logged in
  return logoutTime 
    ? `Login time: ${( new Date( (86400 - (logoutTime.getSeconds() - loginTime.getSeconds())) * 1000 ) ).toISOString().substr(11, 8)} seconds`
    : undefined
  }
}
