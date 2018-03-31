import {Injectable, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DbService} from './db.service';
import {StagedUsersComponent} from '../components/staged-users/staged-users.component';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class StagedUsersService {
  _stagedUsersDialogOpen: boolean;
  _stagedUsersObservable: Observable<any[]>;
  _stagedUsersSubscription: Subscription;
  constructor(private _matDialog: MatDialog, private _dbService: DbService, private _authService: AuthService) {
  }

  startWatchingForStagedUsers() {
    console.log("watching for staged");
    this._stagedUsersObservable = this._dbService.readList(this._authService.session + '/staged').valueChanges();
    this._stagedUsersSubscription = this._stagedUsersObservable.subscribe(stagedUsers => {
      if (!this._stagedUsersDialogOpen && stagedUsers.length > 0) {
        this.openStagedUsersDialog();
      }
    });
  }

  stopWatchingForStagedUsers() {
    if (this._stagedUsersSubscription) {
      this._stagedUsersSubscription.unsubscribe();
    }
  }

  openStagedUsersDialog() {
    this._stagedUsersDialogOpen = true;
    const dialogRef = this._matDialog.open(StagedUsersComponent, {
      width: '35%',
      height: '35%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this._stagedUsersDialogOpen = false;
    });
  }
}
