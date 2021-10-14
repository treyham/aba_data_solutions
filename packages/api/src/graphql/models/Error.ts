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
  field?: string            // which field has error
  @Field()
  message?: string          // what that error is
}

@ObjectType()
export class LoginResponse {
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[]
  @Field(() => String, {nullable: true})
  data?: String
}