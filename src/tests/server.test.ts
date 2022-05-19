/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { ApolloServer } from 'apollo-server';
import { resolvers } from '../resolvers/hero';
import { typeDefs } from '../schema/Heroes';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

describe('Graphql', () => {
  it('Should return the hero', async () => {
    const result = await server.executeOperation({
      query: 'query { listHeroes { id, name} }',
    });

    expect(result.data?.listHeroes[0].id).toBe(1);
    expect(result.data?.listHeroes[0].name).toBe('A-Bomb');
  });

  it('Should limit the hero', async () => {
    const result = await server.executeOperation({
      query: 'query { listHeroes(limit : 1) { id, name} }',
    });

    expect(result.data?.listHeroes.length).toBe(1);
  });
});
