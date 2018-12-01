import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { BehaviorSubject } from 'rxjs/index';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticatedUser = new BehaviorSubject<User>(null);
  constructor(private afAuth: AngularFireAuth,
              private db: DbService) { }

  public login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((result) => {
      console.log(result.user);
      this.authenticatedUser.next(result.user);
      this.db.setProperty(`users/${result.user.uid}`, {
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  logout() {
    this.db.removeProperty(`users/${this.authenticatedUser.value.uid}`);
    this.authenticatedUser.next(null);
    this.afAuth.auth.signOut();
  }

  public getUser() {
    return this.authenticatedUser.asObservable();
  }
}
