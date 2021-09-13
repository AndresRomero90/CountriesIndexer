import { GraphQLError } from 'graphql';



export interface CountriesResponse {
  countries: CountriesNodeConnection
  errors: any
}

export interface CountriesNodeConnection {
  edges: CountryNodeEdge[]
}

export interface CountryNodeEdge {
  node: CountryNode
}

export interface CountryNode {
  id: number
  name: string
  capital?: string
  region?: string
  population?: number
  flag?: string
  alpha2Code?: string
  alpha3Code?: string
  subregion?: string
  topLevelDomain?: string
  nativeName?: string
  borders?: string[]
  languages: LanguageNodeConnection
  currencies: CurrencyNodeConnection
}

export interface CurrencyNodeConnection {
  edges: CurrencyNodeEdge[]
}

export interface CurrencyNodeEdge {
  node: CurrencyNode
}

export interface CurrencyNode {
  code?: string
  name?: string
  symbol?: string
  active?: boolean
}

export interface LanguageNodeConnection {
  edges: LanguageNodeEdge[]
}

export interface LanguageNodeEdge {
  node: LanguageNode
}

export interface LanguageNode {
  name?: string
  nativeName?: string
  active?: boolean
}

export interface CountriesData {
  loading: boolean
  data?: CountriesNodeConnection
  errors?: GraphQLError
}

export interface CountryData {
  loading: boolean
  data?: CountryNode
  errors?: GraphQLError
}
