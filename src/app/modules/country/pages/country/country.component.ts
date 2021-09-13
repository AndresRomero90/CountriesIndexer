import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { CountriesService } from '../../../../shared/services/countries.service';
import { CountryNode } from '../../../../shared/interfaces/countries';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, OnDestroy {

  private _loading: boolean = true;
  private _country: CountryNode | undefined;
  private _borders: CountryNode[] = [];
  private _countrySubscription: Subscription | undefined;
  private _paramsSubscription: Subscription | undefined;

  constructor(
    private _countriesService: CountriesService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _router: Router
  ) { }

  ngOnDestroy(): void {
    this._countrySubscription?.unsubscribe();
    this._paramsSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this._borders = [];
    this._paramsSubscription = this._activatedRoute.params
      .subscribe(({ countryId }) => {
        this._loading = true;
        this._countrySubscription = this._countriesService.country(countryId)
          .subscribe(({ loading, data }) => {
            this._loading = loading;
            this._country = data;
            this._country?.borders?.forEach(b => {
              const borderSubscription = this._countriesService.border(b)
                .subscribe(({ data }) => {
                  this._borders?.push(data!);
                  borderSubscription.unsubscribe();
                });
            });
          })
      });
  }

  get loading() {
    return this._loading;
  }

  get country() {
    return this._country!;
  }

  get borders() {
    return this._borders;
  }

  viewBorder(event: Event) {
    const border: string = (event.target as Element).id;
    this._borders = [];
    this._router.navigate(['/country', border]);
  }

}
