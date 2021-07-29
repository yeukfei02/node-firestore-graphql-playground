import env from 'dotenv';
env.config();

import { ApolloServer } from 'apollo-server';

import { schema } from '../api/schema';

const server = new ApolloServer({
  schema,
  cors: true,
  tracing: true,
  introspection: true,
  playground: true,
  context: ({ req }) => {
    const token = req.headers && req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : '';

    const result = {
      token: token,
    };
    return result;
  },
});
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`server is running on ${url}`);
});
