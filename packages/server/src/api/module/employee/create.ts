import "reflect-metadata"
import * as bcrypt from 'bcryptjs'
import { prisma } from ".prisma/client"
import { PrismaClient } from '@prisma/client'
import {
    Resolver,
    Query,
    Mutation,
    Arg,
    // buildSchema,
    // FieldResolver,
    // Ctx,
    // Root,
  } from "type-graphql"
  

@Resolver()
export class CreateEmployeeResolver {
  @Query(() => String)
  async hello() {
    return "world"
  }

//   @Mutation(() => String)
//   async createEmployee(
//     @Arg('fullname') fullName: string,
//     @Arg('displayName') displayName: string,
//     @Arg('email') email: string,
//     @Arg('password') password: string,
//     @Arg('birthdate') birthdate: string,
//     @Arg('tempPosition') tempPosition: string
//     //   @Arg('created_at') created_at: string,
//     //   @Arg('updated_at') updated_at: string,
//   ) {
//     const hashedPass = await bcrypt.hash(password, 'temp')
//     // const newEmployee = await prisma.
//     return fullName
//   }
}