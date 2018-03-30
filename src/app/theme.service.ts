import {Injectable} from '@angular/core';

@Injectable()
export class ThemeService {
  private _isDark: boolean;

  constructor() {
    this._isDark = false;
  }

  get isDark() {
    return this._isDark;
  }

  set isDark(newIsDark: boolean) {
    this._isDark = newIsDark;
  }

}
