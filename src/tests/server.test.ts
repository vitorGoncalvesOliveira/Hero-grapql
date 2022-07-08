/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { RESTDataSource } from 'apollo-datasource-rest';
import Appolo from '../config/appolo';
import heroesMock from './mock/heroesMock';
import cacheHero from '../config/cache';

const server = Appolo;

describe('Graphql', () => {
  beforeAll(() => {
    jest.spyOn(RESTDataSource.prototype as any, 'get').mockImplementation(async () => heroesMock);
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

    it('should order hero by intelligence', async () => {
      const result = await server.executeOperation({
        query: 'query { listHeroes(limit : 4, order: "intelligence") { id, name, slug, powerstats { intelligence } } }',
      });

      expect(result.data?.listHeroes[0].name).toBe('A-Bomb');
      expect(result.data?.listHeroes[0].powerstats.intelligence).toBe(38);
    });
  });

  describe('Search Heros', () => {
    it('should return Hero filter by name', async () => {
      const result = await server.executeOperation({
        query: 'query { searchHeroes(query :"Abraxas", filter:"name") { id, name, slug }}',
      });

      expect(result.data?.searchHeroes[0].name).toBe('Abraxas');
    });

    it('should return Hero filter by appearance', async () => {
      const result = await server.executeOperation({
        query: 'query { searchHeroes(query :"Ungaran", filter:"appearance") { id, name, slug }}',
      });

      expect(result.data?.searchHeroes[0].name).toBe('Abin Sur');
    });

    it('should return Hero with query equals Mobile', async () => {
      const result = await server.executeOperation({
        query: 'query { searchHeroes(query :"Mobile") { id, name, slug }}',
      });

      expect(result.data?.searchHeroes[0].name).toBe('Abomination');
    });
  });
  describe('cache heroes', () => {
    it('Should call api only once', async () => {
      cacheHero.length = 0;
      const spy = jest.spyOn(RESTDataSource.prototype as any, 'get').mockImplementation(async () => heroesMock);
      await server.executeOperation({
        query: 'query { listHeroes { id, name} }',
      });
      await server.executeOperation({
        query: 'query { listHeroes { id, name} }',
      });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
