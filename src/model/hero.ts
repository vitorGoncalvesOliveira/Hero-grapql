interface Powerstats {
    intelligence: number
    strength: number
    speed: number
    durability: number
    power: number
    combat: number
}
interface Appearance {
    gender: String
    race: String
    height: [String]
    weight: [String]
    eyeColor: String
    hairColor: String
}
interface Biography {
    fullName: String
    alterEgos: String
    aliases: [String]
    placeOfBirth: String
    firstAppearance: String
    publisher: String
    alignment: String
}

interface Work {
    occupation:String
    base: String
}

interface Connections {
    groupAffiliation: String
    relatives: String
}

interface Images {
    xs: String
    sm: String
    md: String
    lg: String
}

export interface Hero {
    id: number
    name: String
    slug: String
    powerstats: Powerstats
    appearance:Appearance
    biography: Biography
    work: Work
    connections: Connections
    images: Images
}
