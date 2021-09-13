import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { CountriesResponse, CountriesData, CountryData } from '../interfaces/countries';

import { first, map } from 'rxjs/operators';

const COUNTRIES_QUERY = gql`
  query Countries {
    countries {
      edges {
        node {
          name
          alpha2Code
          capital
          population
          region
          flag
        }
      }
    }
  }
`;

const REGION_QUERY = gql`
  query Region($regionName: String!) {
    countries(region: $regionName) {
      edges {
        node {
          name
          alpha2Code
          capital
          population
          region
          flag
        }
      }
    }
  }
`;

const SEARCH_QUERY = gql`
  query Search($searchTerm: String!) {
    countries(name_Icontains: $searchTerm) {
      edges {
        node {
          name
          alpha2Code
          capital
          population
          region
          flag
        }
      }
    }
  }
`;

const SUGGESTIONS_QUERY = gql`
  query Suggestions($searchTerm: String!) {
    countries(name_Icontains: $searchTerm) {
      edges {
        node {
          name
          alpha2Code
        }
      }
    }
  }
`;

const COUNTRY_QUERY = gql`
  query Country($alpha2Code: String!) {
    countries(alpha2Code: $alpha2Code) {
      edges {
        node {
          flag
          name
          nativeName
          capital
          population
          region
          subregion
          topLevelDomain
          borders
          languages(active: true) {
            edges {
              node {
                name
              }
            }
          }
          currencies(active: true) {
            edges {
              node {
                name
                code
              }
            }
          }
        }
      }
    }
  }
`;

const BORDER_QUERY = gql`
  query Border($alpha3Code: String!) {
    countries(alpha3Code: $alpha3Code) {
      edges {
        node {
          name
          alpha2Code
        }
      }
    }
  }
`;



@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(
    private _apollo: Apollo
  ) { }

  countries() {
    return this._apollo.watchQuery<CountriesResponse>({
      query: COUNTRIES_QUERY
    })
      .valueChanges
      .pipe(
        map(({ loading, data, errors }) => {
          return {
            loading,
            data: data.countries,
            errors
          } as CountriesData
        })
      );
  }

  country(alpha2Code: string) {
    return this._apollo.watchQuery<CountriesResponse>({
      query: COUNTRY_QUERY,
      variables: { alpha2Code }
    })
      .valueChanges
      .pipe(
        first(),
        map(({ loading, data, errors }) => {
          return {
            loading,
            data: data.countries.edges[0].node,
            errors
          } as CountryData
        })
      );
  }

  region(regionName: string) {
    return this._apollo.watchQuery<CountriesResponse>({
      query: REGION_QUERY,
      variables: { regionName }
    })
      .valueChanges
      .pipe(
        map(({ loading, data, errors }) => {
          return {
            loading,
            data: data.countries,
            errors
          } as CountriesData
        })
      );
  }

  search(searchTerm: string) {
    return this._apollo.watchQuery<CountriesResponse>({
      query: SEARCH_QUERY,
      variables: { searchTerm }
    })
      .valueChanges
      .pipe(
        map(({ loading, data, errors }) => {
          return {
            loading,
            data: data.countries,
            errors
          } as CountriesData
        })
      );
  }

  suggestions(searchTerm: string) {
    return this._apollo.watchQuery<CountriesResponse>({
      query: SUGGESTIONS_QUERY,
      variables: { searchTerm }
    })
      .valueChanges
      .pipe(
        map(({ loading, data, errors }) => {
          return {
            loading,
            data: data.countries,
            errors
          } as CountriesData
        })
      );
  }

  border(alpha3Code: string) {
    return this._apollo.watchQuery<CountriesResponse>({
      query: BORDER_QUERY,
      variables: { alpha3Code }
    })
      .valueChanges
      .pipe(
        first(),
        map(({ loading, data, errors }) => {
          return {
            loading,
            data: data.countries.edges[0].node,
            errors
          } as CountryData
        })
      );
  }
}
