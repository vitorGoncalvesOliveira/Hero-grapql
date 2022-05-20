/* eslint-disable dot-notation */
/* eslint-disable no-self-compare */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import api from '../api/api';
import { filterListHeroes, search } from '../resolvers/hero';
import { Hero } from '../model/hero';

export default class HeroService {
  // eslint-disable-next-line no-unused-vars
  static async findALl({ limit, order }: filterListHeroes) {
    const response = await api.get('/all.json');
    let heroes: Hero[] = response.data;
    if (limit) {
      heroes = heroes.slice(0, limit);
    }
    if (order) {
      heroes.sort((a, b) => {
        if (a[order] > b[order]) { return 1; }
        if (a[order] < b[order]) { return -1; }
        return 0;
      });
    }

    return heroes;
  }

  static async searchHeroes({ filter, query }: search) {
    const response = await api.get('/all.json');
    const heroes = response.data;

    return heroes;
  }
}
