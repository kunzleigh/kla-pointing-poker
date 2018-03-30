import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import {DbService} from './db.service';

@Injectable()
export class AuthService {
  private _authState: Observable<firebase.User>;
  public _currentUser: firebase.User;
  private _session: string;
  private _alias: string;
  private _observer: boolean;
  private _killswitch: Observable<boolean>;
  private _isConnected: Observable<boolean>;
  private _stagedUsersObservable: Observable<any[]>;
  constructor(private _afAuth: AngularFireAuth, private _dbService: DbService) {
    // Check if cache exists
    const cache = this.retrieveFromCache();
    if (cache.session) {
      this.observer = Boolean(this.observer);
      this.alias = cache.alias;
      this.session = cache.session;
    }
    this._authState = this._afAuth.authState;
    this._authState.subscribe(user => {
      if (user) {
        this._currentUser = user;
        this._currentUser['staging'] = true;
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
        } else {
          userToPost['alias'] = user.displayName;
          this.alias = user.displayName;
        }

        this._dbService.getRef(this.session + '/users').once('value').then(users => {
          if (users.val() === null) {
            this.addUser(userToPost);
            this._currentUser['staging'] = false;
          } else {
            this.stageUser(userToPost);
            this._currentUser['staging'] = true;
          }
        });

        this._dbService.getRef(this.session + '/users/' + user.uid).onDisconnect().set(null);
        this._dbService.readProperty('killswitch').valueChanges().subscribe(ks => {
          if (ks && this.currentUser) {
            this.logout(this.currentUser.uid);
          }
        });
        this.addToCache();

        this._stagedUsersObservable = this._dbService.readList(this._session + '/staged').valueChanges();
        this._stagedUsersObservable.subscribe(stagedUsers => {
          let currentlyStaging = false;
          stagedUsers.forEach((user: any) => {
            if (user.uid === this.currentUser.uid) {
              currentlyStaging = true;
            }
          });
          this.currentUser['staging'] = currentlyStaging;
        });
      } else {
        this._currentUser = null;
      }
    });
    this._isConnected = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false));
    this._isConnected.subscribe(connected => {
      if (!connected) {
        this.logout(this.currentUser.uid);
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
    this._dbService.setProperty(this.session + '/users/' + uid, null);
    this.session = null;
    this._afAuth.auth.signOut().then(success => {
      this.removeFromCache();
    }, failure => {
    });
  }

  stageUser(user) {
    this._dbService.setProperty(this.session + '/staged/' + user.uid, user);
  }

  unstageUser(user) {
    this._dbService.removeProperty(this.session + '/staged/' + user.uid);
  }

  moveUserFromStagingToApp(user) {
    this.addUser(user);
    this.unstageUser(user);
  }

  addUser(user) {
    this._dbService.setProperty(this.session + '/users/' + user.uid, user);
  }

  addToCache() {
    window.localStorage.setItem('observer', this.observer ? 'true' : 'false');
    window.localStorage.setItem('session', this.session);
    window.localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    window.localStorage.setItem('alias', this.alias);
  }

  removeFromCache() {
    window.localStorage.removeItem('observer');
    window.localStorage.removeItem('session');
    window.localStorage.removeItem('currentUser');
    window.localStorage.removeItem('alias');
  }

  retrieveFromCache() {
    return {
      observer: window.localStorage.getItem('observer'),
      session: window.localStorage.getItem('session'),
      currentUser: window.localStorage.getItem('currentUser'),
      alias: window.localStorage.getItem('alias'),
    };
  }


}
