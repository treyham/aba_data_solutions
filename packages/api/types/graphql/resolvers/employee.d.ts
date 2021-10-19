import 'reflect-metadata';
import { Employee, EmployeeCreateInput } from '@generated/type-graphql';
import { Context } from '../../interfaces';
export declare class CreateEmployeeResolver {
    me(ctx: Context): Promise<Employee | null>;
    createAdminEncryptPass(ctx: Context, createInput: EmployeeCreateInput): Promise<string | undefined>;
    createBillingEncryptPass(ctx: Context, createInput: EmployeeCreateInput): Promise<string | undefined>;
    createBcbaEncryptPass(ctx: Context, createInput: EmployeeCreateInput): Promise<string | undefined>;
    createRbtEncryptPass(ctx: Context, createInput: EmployeeCreateInput): Promise<string | undefined>;
}
