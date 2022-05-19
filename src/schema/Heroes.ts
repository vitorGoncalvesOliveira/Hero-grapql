/* eslint-disable import/prefer-default-export */
import { gql } from 'apollo-server';

export const typeDefs = gql`

type Hero {
    id: Int
    name: String
    slug: String 
    powerstats: Powerstats
    appearance:Appearance
    biography: Biography
    work: Work
    connections: Connections
    images: Images
}

type Powerstats {
    intelligence: Int
    strength: Int
    speed: Int
    durability: Int
    power: Int
    combat: Int
}
type Appearance {
    gender: String
    race: String
    height: [String]
    weight: [String]
    eyeColor: String
    hairColor: String
}
type Biography {
    fullName: String
    alterEgos: String
    aliases: [String]
    placeOfBirth: String
    firstAppearance: String
    publisher: String
    alignment: String    
}

type Work {
    occupation:String
    base: String
}

type Connections {
    groupAffiliation: String
    relatives: String
}

type Images {
    xs: String
    sm: String
    md: String
    lg: String
}

type Query {
    listHeroes(limit: Int, order: String): [Hero]
    searchHeroes(query: String, filter:String) : [Hero]
}
`;
