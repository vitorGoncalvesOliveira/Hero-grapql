/* eslint-disable */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import HeroService from '../services/hero';
import { Hero } from '../model/hero'; 
export const resolvers = {
  Query: {
    listHeroes: (_:any, {limit, order}:filterListHeroes) => HeroService.findALl({limit, order}),
    searchHeroes: (_:any, args: search) => HeroService.searchHeroes(args)
  },
};

export interface filterListHeroes {
  limit: number;
  order: string;
}

export interface search {
  query: string;
  filter: 'name'| 'appearance' | 'biography' | 'work'| 'connections';
}
