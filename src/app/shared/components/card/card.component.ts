import { Component, Input, OnInit } from '@angular/core';
import { CountryNode } from '../../interfaces/countries';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() country: CountryNode | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
