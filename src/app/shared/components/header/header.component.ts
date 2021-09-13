import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('themeSwitch') themeSwitch: ElementRef | undefined;

  private _bodyClassList: DOMTokenList;
  private _darkModeSet: boolean = false;

  constructor() {
    this._bodyClassList = document.body.classList;
  }

  ngAfterViewInit(): void {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (userPrefersDark) {
      this._bodyClassList.add('dark-theme');
      this._darkModeSet = true;
    } else {
      this._bodyClassList.add('light-theme');
      this._darkModeSet = false;
    }
    this._darkModeSet = userPrefersDark;
    this.themeSwitch!.nativeElement.checked = this._darkModeSet;
  }

  switchTheme() {
    if (this._darkModeSet) {
      this._bodyClassList.remove('dark-theme');
      this._bodyClassList.add('light-theme');
    } else {
      this._bodyClassList.remove('light-theme');
      this._bodyClassList.add('dark-theme');
    }
    this._darkModeSet = !this._darkModeSet;
  }

}
