import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {DbService} from './db.service';

@Injectable()
export class AuthService {
  private _authState: Observable<firebase.User>;
  private _currentUser: firebase.User;
  private _session: string;
  private _alias: string;
  private _observer: boolean;
  private _killswitch: Observable<boolean>;
  constructor(private _afAuth: AngularFireAuth, private _dbService: DbService) {
    this._authState = this._afAuth.authState;
    this._authState.subscribe(user => {
      if (user) {
        this._currentUser = user;
        const userToPost = {
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          img: user.photoURL,
          hasVoted: false,
          observer: this._observer
        };
        if (this._alias) {
          userToPost['alias'] = this._alias;
        }
        this._dbService.setProperty(this._session + '/users/' + user.uid, userToPost);
        this._dbService.readProperty('killswitch').valueChanges().subscribe(ks => {
          if (ks && this.currentUser) {
            this.logout(this.currentUser.uid);
          }
        });
      } else {
        this._currentUser = null;
      }
    });
  }

  get authState() {
    return this._authState;
  }

  get currentUser(): firebase.User {
    return this._currentUser;
  }

  get session(): string {
    return this._session;
  }

  get alias(): string {
    return this._alias;
  }

  set alias(newAlias: string) {
    this._alias = newAlias;
  }

  get observer(): boolean {
    return this._observer;
  }

  set observer(newObserver: boolean) {
    this._observer = newObserver;
  }

  set session(newSession: string) {
    this._session = newSession;
  }

  loginWithGoogle() {
    return this._afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(uid: string) {
    this._dbService.removeProperty(this.session + '/users/' + uid);
    this.session = null;
    this._afAuth.auth.signOut().then(success => {
    }, failure => {

    });
  }

}
