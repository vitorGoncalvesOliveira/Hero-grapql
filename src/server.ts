/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers/hero';
import { typeDefs } from './schema/Heroes';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server running in ${url}`);
});
