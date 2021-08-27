import "reflect-metadata"
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
  // TreatmentPlan_to_PrograRelationsdResolver
} from '@-/api/graphql/generated'
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