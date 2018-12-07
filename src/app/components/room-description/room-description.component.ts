import { Component, Input, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-room-description',
  templateUrl: './room-description.component.html',
  styleUrls: ['./room-description.component.scss']
})
export class RoomDescriptionComponent implements OnInit {
  @Input() public room: any;
  public roomUsers: any[];

  constructor(private db: DbService,
              private authService: AuthService,
              private stateService: StateService) {
  }

  ngOnInit() {
    if (this.room) {
      this.roomUsers = Object.keys(this.room.users).map((i) => this.room.users[i]);
    }
  }

  public joinAsVoter(): void {
    this.join(false);
  }

  public joinAsObserver(): void {
    this.join(true);
  }

  private join(observer): void {
    const newUserObj = {};
    newUserObj[this.authService.authenticatedUser.value.uid] = {
      displayName: this.authService.authenticatedUser.value.displayName,
      uid: this.authService.authenticatedUser.value.uid,
      email: this.authService.authenticatedUser.value.email,
      photoURL: this.authService.authenticatedUser.value.photoURL,
      observer: observer
    };
    this.db.setProperty(`rooms/${this.room.uid}/users/`, newUserObj);
    this.stateService.joinRoom(this.room);
  }

}
