import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AuthService} from '../../services/auth.service';
import {DbService} from '../../services/db.service';

@Component({
  selector: 'app-staged-users',
  templateUrl: './staged-users.component.html',
  styleUrls: ['./staged-users.component.css']
})
export class StagedUsersComponent implements OnInit {
  public stagedUsers: any[];
  constructor(private _dialogRef: MatDialogRef<StagedUsersComponent>, private _dbService: DbService, private _authService: AuthService) {
    this._dbService.readList(this._authService.session + '/staged').valueChanges().subscribe(stagedUsers => {
      this.stagedUsers = stagedUsers;
      if (this.stagedUsers.length === 0) {
        this._dialogRef.close();
      }
    });
  }

  ngOnInit() {
  }

  approveUser(user: any) {
    this._authService.moveUserFromStagingToApp(user);
  }

  approveAll() {
    this.stagedUsers.forEach(user => {
      this.approveUser(user);
    });
  }
}
