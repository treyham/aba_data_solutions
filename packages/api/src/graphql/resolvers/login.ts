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

  // TODO sort out returns
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
  @Mutation(() => String)
  async login(
  @Ctx() ctx: Context,
  @Arg('displayName', () => String) empDispName: string,
  @Arg('password') empPass: string
  ): Promise<string | undefined> {
    const emp = await ctx.prisma.employee.findUnique({
      where: {
        displayName: empDispName,
      }
    })
    ctx.req.session.set('eid', emp?.id)
    // console.log(`login Resolver: session = `, ctx.req.session)
    return await argon2.verify(emp ? emp.password : '', empPass)
      ? this.createLogin(ctx, emp!.id)
      : undefined
  }
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
  const login = await ctx.prisma.login.create({
    data: {
      employee: {
        connect: {
          id: employeeId
        }
      }
    },
    select: { id: true, loggedIn: true }
  })
  // loggedIn table
  const { id } = await ctx.prisma.loggedIn.create({
    data: {
      sid: ctx.session.id,
      login: {
        connect: {
          id: login.id
        }
      }
    },
    select: { id: true,  }
  })
  ctx.req.session.set('lid', id)
  console.log(`Login Resolver: \nsession = `, ctx.req.session)
  return id
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
  // get loginId from loggedIn table
  // const lid = await ctx.prisma.loggedIn.findUnique({
    // where: { employeeId },
    // select: { loginId: true }
  // })
  // update logged out time on login table
  const { loginTime, logoutTime } = await ctx.prisma.login.update({
    where: {
      id: loginId
      // id: lid.loginId?
    },
    data: {
      logoutTime: new Date()
    },
    select: {
      loginTime: true,
      logoutTime: true
    }
  })
  loginTime && logoutTime && ctx.req.destroySession()
  // return amount of seconds logged in
  return logoutTime
    ? `Login time: ${(new Date( (logoutTime.getSeconds() - loginTime.getSeconds()) * 1000 )).toISOString().substr(11, 8)} seconds` 
    : undefined
  }
}