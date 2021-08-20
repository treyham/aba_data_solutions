import { makeExecutableSchema } from '@graphql-tools/schema'
// import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'
import { resolvers } from '../../api/type-graphql/generated/index'

const fs = require('fs');
const path = require('path');

const Query = require('./resolvers/query')
const Mutation = require('./resolvers/mutation')


const typeDefs = fs.readFileSync(
  path.join(__dirname, '../model/typeDefs.graphql'),
  'utf8'
)


export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query,
    Mutation
  },
  
})