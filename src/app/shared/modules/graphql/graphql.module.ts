import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Apollo Imports
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

const uri: string = 'https://graphql.country/graphql';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ]
})

export class GraphqlModule {

  constructor(
    private _apollo: Apollo,
    private _httpLink: HttpLink,
  ) {

    this._apollo.create({
      link: this._httpLink.create({ uri }),
      cache: new InMemoryCache(),
    });
  }
}
