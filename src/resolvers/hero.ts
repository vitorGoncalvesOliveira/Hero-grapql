/* eslint-disable */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { Hero } from '../model/hero'; 
export const resolvers = {
  Query: {
    listHeroes: ( root:any, {limit, order}:filterListHeroes,{ dataSources }:any) => dataSources.heroApi.findALl({limit, order}),
    searchHeroes: ( root:any, args: search, {dataSources }:any) => dataSources.heroApi.searchHeroes(args)
  },
  Mutation:{
    addHeroes:( root:any, args:Hero, { dataSources}:any) => dataSources.heroApi.addHeros(args)
  }
};

export interface filterListHeroes {
  limit: number;
  order: string;
}

export interface search {
  query: string;
  filter: 'name'| 'appearance' | 'biography' | 'work'| 'connections';
}
