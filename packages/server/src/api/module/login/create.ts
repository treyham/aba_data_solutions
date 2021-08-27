import "reflect-metadata"
import { LoginCreateInput } from '@-/api/graphql/generated';
import { Context } from '@-/server/src/context'
import argon2 from 'argon2'

import {
    Resolver,
    Query,
    Mutation,
    Arg,
    FieldResolver,
    Ctx,
    Root,
} from "type-graphql"


@Resolver()
export class LoginResolver {
    @Mutation(() => Boolean)
    async employeeLogin(
        @Ctx() ctx: Context,
        @Arg("employeeLoginInput") employeeLoginInput: LoginCreateInput
    ): Promise<boolean> {
        return true
    }
}
