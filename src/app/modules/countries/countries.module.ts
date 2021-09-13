import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CountriesRoutingModule } from './countries-routing.module';

import { CountriesComponent } from './pages/countries/countries.component';
import { CardComponent } from '../../shared/components/card/card.component';


@NgModule({
  declarations: [
    CountriesComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    FormsModule
  ]
})
export class CountriesModule { }
