import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/index';
import { User } from 'firebase';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // public user: User;
  public user = 1;

  constructor(public authService: AuthService) {
  }

  public ngOnInit() {
    this.authService.getUser().subscribe((user: User) => {
      // this.user = user;
      this.user = 1;
    });
  }
}

//
// {
//   "rules": {
//   "users": {
//     "$uid": {
//       ".read": "auth != null",
//         ".write": "$uid == auth.uid"
//     }
//   }
// }
// }

