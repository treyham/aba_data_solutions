import 'reflect-metadata'
import { Employee, EmployeeCreateInput } from '@generated/type-graphql'
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
import {v4 as uuid} from 'uuid'
import { Context } from '../../interfaces'

// TODO put this in prisma schema above password in employee
/// @TypeGraphQL.omit(output: true)
@Resolver()
export class CreateEmployeeResolver {
// TODO return current logged in employee
  @Query(() => Employee)
  async me(
    @Ctx() ctx: Context
  ):Promise<Employee | null> {
    console.log('(api/resolvers/employee) session: ', ctx.req.session)
    const eid = ctx.session.get('eid')?.toString()
    console.log({ eid })
    return eid
      ? await ctx.prisma.employee.findUnique({
        where: { id: ctx.session.get('eid')?.toString() }
        })
      : null
  }
// administration
  @Mutation(() => String)
  async createAdminEncryptPass(
    @Ctx() ctx: Context,
    @Arg('createInput') createInput: EmployeeCreateInput
  ): Promise<string | undefined> {
    createInput.password = await argon2.hash(createInput.password)
    const { Administration } = await ctx.prisma.employee.create({
      data: {
        ...createInput,
        Administration: {
          create: {
            PermissionLevel: createInput.Administration?.create?.PermissionLevel
          }
        }
      },
      select: { Administration: true }
    })
    return Administration?.id
  }
//billing
  @Mutation(() => String)
  async createBillingEncryptPass(
    @Ctx() ctx: Context,
    @Arg('createInput') createInput: EmployeeCreateInput
  ): Promise<string | undefined> {
    createInput.password = await argon2.hash(createInput.password)
    const { Billing } = await ctx.prisma.employee.create({
      data: {
        ...createInput,
        Billing: {
          create: { id: uuid() } 
        }
      },
      select: { Billing: true }
    })
    return Billing?.id
  }
//bcba
  @Mutation(() => String)
  async createBcbaEncryptPass(
    @Ctx() ctx: Context,
    @Arg('createInput') createInput: EmployeeCreateInput
  ): Promise<string | undefined> {
    createInput.password = await argon2.hash(createInput.password)
    const { Bcba } = await ctx.prisma.employee.create({
      data: {
        ...createInput,
        Bcba: {
          create: { id: uuid() } 
        }
      },
      select: { Bcba: true }
    })
    return Bcba?.id
  }
//rbt
  @Mutation(() => String)
  async createRbtEncryptPass(
    @Ctx() ctx: Context,
    @Arg('createInput') createInput: EmployeeCreateInput
  ): Promise<string| undefined> {
    createInput.password = await argon2.hash(createInput.password)
    const { Rbt } = await ctx.prisma.employee.create({
      data: {
        ...createInput,
        Rbt: {
          create: { id: uuid() }
        }
      },
      select: { Rbt: true }
    })
    return Rbt?.id
  }
}
