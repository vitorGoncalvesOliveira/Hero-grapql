/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import Appolo from '../config/appolo';
import Api from '../api/api';
import heroesMock from './mock/heroesMock';

const server = Appolo;

describe('Graphql', () => {
  beforeAll(() => {
    const result = {
      data: heroesMock,
    };
    jest.spyOn(Api, 'get').mockImplementation(async () => result);
  });

  describe('List Heroes ', () => {
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

    it('should order hero by slug', async () => {
      const result = await server.executeOperation({
        query: 'query { listHeroes(limit : 4, order: "slug") { id, name, slug} }',
      });

      expect(result.data?.listHeroes[0].name).toBe('Abe Sapien');
    });
  });
});
