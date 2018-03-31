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
  public _authLoading: boolean;

  constructor(private _afAuth: AngularFireAuth, private _dbService: DbService) {
    this._authState = this._afAuth.authState;
    this._authState.subscribe(user => {
      if (user) {
        this._currentUser = user;
        this._authLoading = true;
        // User has been cached
        this._dbService.getRef('/overallUsers/' + user.uid).once('value').then(userCache => {
          if (userCache.val() !== null) {
            this._session = userCache.val().session;
            this._observer = userCache.val().observer;
            this._alias = userCache.val().alias;
          } else {
            const cacheUserInDB = {
              session: this._session,
              observer: this._observer,
              alias: this._alias,
              uid: user.uid
            };
            this.addUserToOverall(cacheUserInDB);
          }

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
          this._authLoading = false;
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

  //<editor-fold desc="Getters and Setters">
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

  get authLoading() {
    return this._authLoading;
  }
  //</editor-fold>

  loginWithGoogle() {
    return this._afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(uid: string) {
    this.removeUser(this.currentUser);
    this.removeUserFromOverall(this.currentUser);
    this.session = null;
    this._afAuth.auth.signOut().then(success => {
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

  removeUser(user) {
    this._dbService.setProperty(this.session + '/users/' + user.uid, null);
  }

  addUserToOverall(user) {
    this._dbService.setProperty('/overallUsers/' + user.uid, user);
  }

  removeUserFromOverall(user) {
    this._dbService.removeProperty('/overallUsers/' + user.uid);
  }
}
