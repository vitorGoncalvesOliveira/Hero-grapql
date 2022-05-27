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

input NewPowerstats {
    intelligence: Int
    strength: Int
    speed: Int
    durability: Int
    power: Int
    combat: Int
}
input NewAppearance {
    gender: String
    race: String
    height: [String]
    weight: [String]
    eyeColor: String
    hairColor: String
}
input NewBiography {
    fullName: String
    alterEgos: String
    aliases: [String]
    placeOfBirth: String
    firstAppearance: String
    publisher: String
    alignment: String    
}

input NewWork {
    occupation:String
    base: String
}

input NewConnections {
    groupAffiliation: String
    relatives: String
}

input NewImages {
    xs: String
    sm: String
    md: String
    lg: String
}


input NewHero {    
    name: String
    slug: String 
    powerstats: NewPowerstats
    appearance: NewAppearance
    biography: NewBiography
    work: NewWork
    connections: NewConnections
    images: NewImages
}

type Query {
    listHeroes(limit: Int, order: String): [Hero]
    searchHeroes(query: String! , filter:String) : [Hero]
}
type Mutation {
    addHeroes(hero: NewHero): Hero
}
`;
