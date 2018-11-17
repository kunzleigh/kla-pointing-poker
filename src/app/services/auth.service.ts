import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { BehaviorSubject } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticatedUser = new BehaviorSubject<User>(null);
  constructor(private afAuth: AngularFireAuth) { }

  public login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((result) => {
      console.log(result.user);
      this.authenticatedUser.next(result.user);
    }).catch((err) => {
      console.log(err);
    });
  }

  logout() {
    this.authenticatedUser.next(null);
    this.afAuth.auth.signOut();
  }

  public getUser() {
    return this.authenticatedUser.asObservable();
  }
}
