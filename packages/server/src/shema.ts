import { makeExecutableSchema } from '@graphql-tools/schema'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'

const fs = require('fs');
const path = require('path');

const Query = require('./resolvers/query')
const Mutation = require('./resolvers/mutation')


const typeDefs = fs.readFileSync(
    path.join(__dirname, '../model/typeDefs.graphql'),
    'utf8'
)

const resolvers = {
  Query,
  Mutation
}

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})