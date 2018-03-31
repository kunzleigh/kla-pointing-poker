import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public _authService: AuthService, public _themeService: ThemeService) {
  }

  ngOnInit() {
  }

  logout(uid: string) {
    this._authService.logout(uid);
  }

  setDark() {
    this._themeService.isDark = true;
  }

  setLight() {
    this._themeService.isDark = false;
  }
}
