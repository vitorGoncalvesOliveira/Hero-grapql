/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable guard-for-in */
/* eslint-disable dot-notation */
/* eslint-disable no-self-compare */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import api from '../api/api';
import { filterListHeroes, search } from '../resolvers/hero';
import { Hero } from '../model/hero';

const objectKeys: string[] = [];
export default class HeroService {
  // eslint-disable-next-line no-unused-vars
  static async findALl({ limit, order }: filterListHeroes) {
    const response = await api.get('/all.json');
    let heroes: Hero[] = response.data;
    if (limit) {
      heroes = heroes.slice(0, limit);
    }
    if (order) {
      const temp:Hero = heroes[0];

      const keys = HeroService.getObjectKeys(temp);
      const key = keys.find((k) => k.includes(order));
      if (key) {
        heroes.sort((a:any, b:any) => {
          const elementA = key.split('.').reduce((prev, curr) => prev && prev[curr], a);
          const elementB = key.split('.').reduce((prev, curr) => prev && prev[curr], b);
          if (elementA > elementB) { return 1; }
          if (elementA < elementB) { return -1; }
          return 0;
        });
      }
    }

    return heroes;
  }

  static async searchHeroes({ filter, query }: search) {
    const response = await api.get('/all.json');
    const heroes = response.data;
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
        const properties = Object.values(her);
        const realKey = properties.map((e:any) => {
          if (typeof e === 'object') {
            return [...Object.values(e)];
          }
          return e;
        }).flat();
        return realKey.includes(query);
      });
    }

    return hero || 'null';
  }

  static getObjectKeys(obj: { [x: string]: any; }, previousPath = '') {
    // Step 1- Go through all the keys of the object
    Object.keys(obj).forEach((key) => {
      // Get the current path and concat the previous path if necessary
      const currentPath = previousPath ? `${previousPath}.${key}` : key;
      // Step 2- If the value is a string, then add it to the keys array
      if (typeof obj[key] !== 'object') {
        objectKeys.push(currentPath);
      } else {
        objectKeys.push(currentPath);
        // Step 3- If the value is an object, then recursively call the function
        HeroService.getObjectKeys(obj[key], currentPath);
      }
    });
    return objectKeys;
  }
}
