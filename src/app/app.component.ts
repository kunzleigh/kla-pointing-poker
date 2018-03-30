import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {ThemeService} from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public currentUser;
  public chatOpened: boolean;
  constructor(public _authService: AuthService, public _themeService: ThemeService) {
  }

  ngOnInit() {
    this._authService.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }
}


