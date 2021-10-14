

# API

## Graphql + TypeGraphql + Prisma

### Features

##### *rapid prototyping*
This is a graphql api using a ```prisma.schema``` as the source of truth. Typegraphql-prisma generates typescript types for our models, as well as crud, i/o, ands relations resolvers

##### *easy workflow*
    1.  design database using prisma schema
    2.  run ```npx prisma generate``` prisma client and typegraphql generated
    3. use generated resolvers or use types (and/or generated resolvers) to make your own
    4. import resolvers into @server and use them to build schema for fastify server
    5. test schema with altair