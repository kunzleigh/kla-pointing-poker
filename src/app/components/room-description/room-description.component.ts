import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-description',
  templateUrl: './room-description.component.html',
  styleUrls: ['./room-description.component.scss']
})
export class RoomDescriptionComponent implements OnInit {
  @Input() public room: any;
  public roomUsers: any[];
  constructor() { }

  ngOnInit() {
    if (this.room) {
      this.roomUsers = Object.keys(this.room.users).map((i) => this.room.users[i]);
    }
  }

}
