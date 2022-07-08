/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { RESTDataSource } from 'apollo-datasource-rest';
import { filterListHeroes, search } from '../resolvers/hero';
import { Hero } from '../model/hero';
import cacheHero from '../config/cache';
import Util from '../util/util';

export default class HeroApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://akabab.github.io/superhero-api/api';
  }

  async findALl({ limit, order }: filterListHeroes) {
    let heroes: Hero[];
    if (cacheHero.length) {
      heroes = cacheHero;
    } else {
      heroes = await this.get('/all.json');
      cacheHero.push(...heroes);
    }
    if (limit) {
      heroes = heroes.slice(0, limit);
    }
    if (order) {
      const temp:Hero = heroes[0];

      const keys = Util.getObjectKeys(temp, '', []);
      const key = keys.find((k:any) => k.includes(order));
      if (key) {
        heroes.sort((a:any, b:any) => {
          const elementA = key.split('.').reduce((prev:any, curr:any) => prev && prev[curr], a);
          const elementB = key.split('.').reduce((prev:any, curr:any) => prev && prev[curr], b);
          if (elementA > elementB) { return 1; }
          if (elementA < elementB) { return -1; }
          return 0;
        });
      }
    }

    return heroes;
  }

  async searchHeroes({ filter, query }: search) {
    let heroes: Hero[];
    if (cacheHero.length) {
      heroes = cacheHero;
    } else {
      heroes = await this.get('/all.json');
    }

    let hero: Hero[] = [];
    const temp = heroes[0];
    const keys = Object.keys(temp);

    if (filter) {
      if (keys.includes(filter)) {
        const keyType = typeof temp[filter];
        if (keyType === 'object') {
          hero = heroes.filter((her:any) => Object.values(her[filter]).includes(query));
        } else {
          hero = heroes.filter((her:any) => her[filter] === query);
        }
      }
    } else {
      hero = heroes.filter((her:any) => {
        const heroesValue = Util.getObjectValuesInArray(her);
        return heroesValue.includes(query);
      });
    }

    return hero || 'null';
  }

  async addHeros(hero : any) {
    if (cacheHero.length) {
      hero.hero.id = cacheHero.length + 1;
      cacheHero.push(hero.hero);
      return hero.hero;
    }

    throw new Error('No cached to add Hero');
  }
}
