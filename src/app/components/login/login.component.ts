import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  session: string;
  alias: string;
  observer = false;
  constructor(private _authService: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    if (this.session) {
      this._authService.session = this.session;
      this._authService.alias = this.alias;
      this._authService.observer = this.observer;
      this._authService.loginWithGoogle().then(success => {

      }, rejected => {
        this.session = undefined;
      });
    }
  }

}
