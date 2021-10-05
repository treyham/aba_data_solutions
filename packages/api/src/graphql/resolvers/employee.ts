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
  @Query(() => Employee)
  // TODO return current logged in employee
  async me(@Ctx() ctx: Context):Promise<Employee | null> {
    console.log('session: ', ctx.req.session.get('key'))
    return await ctx.prisma.employee.findFirst({
    })
  }
// administration
  @Mutation(() => Boolean)
  async createAdminEncryptPass(
    @Ctx() ctx: Context,
    @Arg('createInput') createInput: EmployeeCreateInput
  ): Promise<boolean> {
    const encryptedPass = await argon2.hash(createInput.password)
    return !!(await ctx.prisma.employee.create({
      data: {
        ...createInput,
        password: encryptedPass,
        Administration: {
          create: {
            PermissionLevel: createInput.Administration?.create?.PermissionLevel
          }
        }
      }
    }))
  }
//billing
@Mutation(() => String)
  async createBillingEncryptPass(
    @Ctx() ctx: Context,
    @Arg('createInput') createInput: EmployeeCreateInput
  ): Promise<string | undefined> {
    const encryptedPass = await argon2.hash(createInput.password)
    const { Billing } = await ctx.prisma.employee.create({
      data: {
        ...createInput,
        password: encryptedPass,
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
    const encryptedPass = await argon2.hash(createInput.password)
    const { Bcba } = await ctx.prisma.employee.create({
      data: {
        ...createInput,
        password: encryptedPass,
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
    console.log('password: ', createInput.password)
    const encryptedPass = await argon2.hash(createInput.password)
    const { Rbt } = await ctx.prisma.employee.create({
      data: {
        ...createInput,
        password: encryptedPass,
        Rbt: {
          create: { id: uuid() }
        }
      },
      select: { Rbt: true }
    })
    return Rbt?.id
  }
}
