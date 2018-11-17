import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: User;
  constructor(public authService: AuthService) {
  }

  public login() {
    this.authService.login();
  }

  public logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
    });
  }
}
