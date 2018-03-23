import { Component, OnInit } from '@angular/core';
import {DbService} from '../../services/db.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-point-grid',
  templateUrl: './point-grid.component.html',
  styleUrls: ['./point-grid.component.css']
})
export class PointGridComponent implements OnInit {
  points = [
    {text: '0', cols: 1, rows: 1, value: 0},
    {text: '1', cols: 1, rows: 1, value: 1},
    {text: '2', cols: 1, rows: 1, value: 2},
    {text: '3', cols: 1, rows: 1, value: 3},
    {text: '5', cols: 1, rows: 1, value: 5},
    {text: '8', cols: 1, rows: 1, value: 8},
    {text: '13', cols: 1, rows: 1, value: 13},
    {text: '21', cols: 1, rows: 1, value: 21},
    {text: '34', cols: 1, rows: 1, value: 34},
    {text: '55', cols: 1, rows: 1, value: 55},
  ];
  constructor(private _dbService: DbService, public _authService: AuthService) { }

  ngOnInit() {
  }

  vote(pointValue: number) {
    this._dbService.setProperty(this._authService.session + '/votes/' + this._authService.currentUser.uid, {
      uid: this._authService.currentUser.uid,
      points: pointValue
    });
    this._dbService.setProperty(this._authService.session + '/users/' + this._authService.currentUser.uid + '/hasVoted', true);
  }
}
