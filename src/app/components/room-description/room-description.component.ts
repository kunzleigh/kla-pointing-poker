import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-description',
  templateUrl: './room-description.component.html',
  styleUrls: ['./room-description.component.scss']
})
export class RoomDescriptionComponent implements OnInit {
  @Input() public room: any;
  constructor() { }

  ngOnInit() {
  }

}
