import "reflect-metadata"
import { buildSchema } from "type-graphql"

// generated
// import * as models from '@generated/type-graphql/models'
import {
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
  TreatmentPlan_to_ProgramCrudResolver
} from '@generated/type-graphql/resolvers/crud'
import {
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
  // TreatmentPlan_to_PrograRelationsdResolver
} from '@generated/type-graphql/resolvers/relations'

// custom
import { CreateEmployeeResolver } from './api/module/employee/create'


export const schema = await buildSchema({
  resolvers: [
    /**
     *                        G e n e r a t e d 
     */ 
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
    // TreatmentPlan_to_PrograRelationsdResolver
    /**
     *                          C u s t o m 
     */ 
    CreateEmployeeResolver
  ]
})