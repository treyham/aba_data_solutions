import "reflect-metadata"
// import { AdministrationCrudResolver, AdministrationRelationsResolver } from '@generated/type-graphql';
import { buildSchema } from "type-graphql"

// generated
import {
  // crud
  AdministrationCrudResolver,
  BcbaCrudResolver,
  BillingCrudResolver,
  BillingObjectCrudResolver,
  ClientCrudResolver,
  EmployeeCrudResolver,
  LoginCrudResolver,
  PersonalInfoCrudResolver,
  PlanCrudResolver,
  ProgramCrudResolver,
  ProviderCrudResolver,
  RbtCrudResolver,
  RecordCrudResolver,
  SessionCrudResolver,
  TreatmentPlanCrudResolver,
  TreatmentPlan_to_ProgramCrudResolver,
  // relations
  AdministrationRelationsResolver,
  BcbaRelationsResolver,
  BillingRelationsResolver,
  // BillingObjectRelationsResolver,
  ClientRelationsResolver,
  EmployeeRelationsResolver,
  LoginRelationsResolver,
  // PersonalInfoRelationsResolver,
  PlanRelationsResolver,
  ProgramRelationsResolver,
  ProviderRelationsResolver,
  RbtRelationsResolver,
  RecordRelationsResolver,
  SessionRelationsResolver,
  TreatmentPlanRelationsResolver,
  TreatmentPlan_to_ProgramRelationsResolver,
  //types
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
  TreatmentPlan_to_Program

} from '@generated/type-graphql'
// custom
// import { CreateEmployeeResolver } from './api/module/employee/create'
// /home/tham/aba_data_solutions/node_modules/@-/api/dist/generated/resolvers/crud

export const schema = await buildSchema({
  resolvers: [
    // AdministrationCrudResolver
    /**
     *                        G e n e r a t e d 
     */ 
    // crud 
    // AdministrationCrudResolver, AdministrationRelationsResolver,
    AdministrationCrudResolver,
    BcbaCrudResolver,
    BillingCrudResolver,
    BillingObjectCrudResolver,
    ClientCrudResolver,
    EmployeeCrudResolver,
    LoginCrudResolver,
    PersonalInfoCrudResolver,
    PlanCrudResolver,
    ProgramCrudResolver,
    ProviderCrudResolver,
    RbtCrudResolver,
    RecordCrudResolver,
    SessionCrudResolver,
    TreatmentPlanCrudResolver,
    TreatmentPlan_to_ProgramCrudResolver,
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
    SessionRelationsResolver,
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
    // CreateEmployeeResolver
  ]
})