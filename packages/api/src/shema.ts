import 'reflect-metadata'
import {
  Administration,
  // AdministrationCrudResolver,
  AdministrationRelationsResolver,
  Bcba,
  // BcbaCrudResolver,
  BcbaRelationsResolver,
  Billing,
  // BillingCrudResolver,
  // BillingObjectCrudResolver,
  BillingRelationsResolver,
  Client,
  // ClientCrudResolver,
  // BillingObjectRelationsResolver,
  ClientRelationsResolver,
  Employee,
  // EmployeeCrudResolver,
  EmployeeRelationsResolver,
  Login,
  // LoginCrudResolver,
  LoginRelationsResolver,
  PersonalInfo,
  // PersonalInfoCrudResolver,
  Plan,
  // PlanCrudResolver,
  // PersonalInfoRelationsResolver,
  PlanRelationsResolver,
  Program,
  // ProgramCrudResolver,
  ProgramRelationsResolver,
  Provider,
  // ProviderCrudResolver,
  ProviderRelationsResolver,
  Rbt,
  // RbtCrudResolver,
  RbtRelationsResolver,
  Record,
  // RecordCrudResolver,
  RecordRelationsResolver,
  Session,
  // SessionCrudResolver,
  ClientSessionRelationsResolver,
  TreatmentPlan,
  // TreatmentPlanCrudResolver,
  TreatmentPlanRelationsResolver,
  TreatmentPlan_to_Program,
  // TreatmentPlan_to_ProgramCrudResolver,
  TreatmentPlan_to_ProgramRelationsResolver
} from '@generated/type-graphql'
import { CreateEmployeeResolver, EmployeeLoginResolver } from './graphql/resolvers'
import { buildSchema } from 'type-graphql'

// build TypeGraphQL executable schema
export const schema = await buildSchema({
  resolvers: [
    /**
     *                        G e n e r a t e d
     */
    // crud
    // AdministrationCrudResolver,BcbaCrudResolver,BillingCrudResolver,BillingObjectCrudResolver,ClientCrudResolver,EmployeeCrudResolver,LoginCrudResolver,PersonalInfoCrudResolver,PlanCrudResolver,ProgramCrudResolver,ProviderCrudResolver,RbtCrudResolver,RecordCrudResolver,SessionCrudResolver, TreatmentPlanCrudResolver, TreatmentPlan_to_ProgramCrudResolver,
    // relations
    AdministrationRelationsResolver,
    BcbaRelationsResolver,
    BillingRelationsResolver,
    ClientRelationsResolver,
    EmployeeRelationsResolver,
    LoginRelationsResolver,
    PlanRelationsResolver,
    ProgramRelationsResolver,
    ProviderRelationsResolver,
    RbtRelationsResolver,
    RecordRelationsResolver,
    ClientSessionRelationsResolver,
    TreatmentPlanRelationsResolver,
    TreatmentPlan_to_ProgramRelationsResolver,
    // types
    Administration,
    Bcba,
    Billing,
    Client,
    Employee,
    Login,
    PersonalInfo,
    Plan,
    Program,
    Provider,
    Rbt,
    Record,
    Session,
    TreatmentPlan,
    TreatmentPlan_to_Program,
    /**
     *                          C u s t o m
     */
    CreateEmployeeResolver,
    EmployeeLoginResolver
  ],
  authChecker: ({ context: {req} }) => {

    return true
  }
})
