/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { ApolloServer } from 'apollo-server';
import { resolvers } from '../resolvers/hero';
import { typeDefs } from '../schema/Heroes';
import HeroApi from '../api/hero-api';

export default new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    heroApi: new HeroApi(),
  }),
});
