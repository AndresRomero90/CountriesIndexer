import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { CountriesService } from '../../../../shared/services/countries.service';
import { CountriesNodeConnection } from '../../../../shared/interfaces/countries';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit, OnDestroy {

  private _countries: CountriesNodeConnection | undefined;
  private _loading: boolean = true;
  private _debouncer: Subject<string> = new Subject();
  private _suggestions: CountriesNodeConnection | undefined;
  private _countriesSubscription: Subscription | undefined;
  private _regionSubscription: Subscription | undefined;
  private _searchSubscription: Subscription | undefined;

  public term: string = '';
  public regions: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
  ]


  constructor(
    private _countriesService: CountriesService
  ) { }

  ngOnDestroy(): void {
    this._debouncer?.unsubscribe();
    this._countriesSubscription?.unsubscribe();
    this._regionSubscription?.unsubscribe();
    this._searchSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this._debouncer
      .pipe(debounceTime(500))
      .subscribe((term: string) => {
        if (term !== '') {
          const suggestionsSubscription = this._countriesService.suggestions(term)
            .subscribe(({ data }) => {
              if (data) {
                this._suggestions = data;
                suggestionsSubscription.unsubscribe();
              }
            });
        } else {
          this._suggestions = undefined;
        }

      });

    this._loading = true;

    this._countriesSubscription = this._countriesService.countries()
      .subscribe(({ loading, data }) => {
        this._loading = loading;
        if (data) {
          this._countries = data;
        }
      });
  }

  get loading(): boolean {
    return this._loading;
  }

  get countries(): CountriesNodeConnection {
    return this._countries!;
  }

  get suggestions(): CountriesNodeConnection | undefined {
    return this._suggestions;
  }

  filterByRegion(region: string) {
    this._loading = true;

    this._regionSubscription = this._countriesService.region(region)
      .subscribe(({ loading, data }) => {
        this._loading = loading;
        if (data) {
          this._countries = data;
        }
      })
  }

  search() {
    this._suggestions = undefined;
    this._loading = true;

    this._searchSubscription = this._countriesService.search(this.term)
      .subscribe(({ loading, data }) => {
        this._loading = loading;
        if (data) {
          this._countries = data;
        }
      })
  }

  keyPressed() {
    this._debouncer.next(this.term);
  }

}
