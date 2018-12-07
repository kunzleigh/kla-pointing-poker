import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { AuthService } from '../../services/auth.service';
import { DbService } from '../../services/db.service';
import { Observable } from 'rxjs/index';

@Component({
  selector: 'app-active-room',
  templateUrl: './active-room.component.html',
  styleUrls: ['./active-room.component.scss']
})
export class ActiveRoomComponent implements OnInit {
  public room: Observable<any>;
  public roomUsers: any[];
  constructor(private db: DbService,
              private authService: AuthService,
              private stateService: StateService) {
  }

  ngOnInit() {
    this.room = this.db.readProperty(`rooms/${this.stateService.room.value.uid}`).valueChanges();
    this.room.subscribe(room => {
      this.roomUsers = Object.keys(room.users).map((i) => room.users[i]);
    });
  }

}
