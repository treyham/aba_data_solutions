import { Employee } from '@generated/type-graphql'
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


@ObjectType()
export class FieldError {
  @Field()
  field?: string
  @Field()
  message?: string
}

@ObjectType()
export class LoginResponse {
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[]
  @Field(() => Employee, {nullable: true})
  employee?: Employee
}