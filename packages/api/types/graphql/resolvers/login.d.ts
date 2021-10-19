import 'reflect-metadata';
import { Context } from '../../interfaces';
export declare class EmployeeLoginResolver {
    isLoggedIn(ctx: Context, employeeId: string): Promise<boolean>;
    login(ctx: Context, empDispName: string, empPass: string): Promise<string | undefined>;
    createLogin(ctx: Context, employeeId: string): Promise<string | undefined>;
    logout(ctx: Context, employeeId: string): Promise<string | undefined>;
}
