import { Component, Input, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-active-room-header',
  templateUrl: './active-room-header.component.html',
  styleUrls: ['./active-room-header.component.scss']
})
export class ActiveRoomHeaderComponent implements OnInit {
  @Input() name: string;
  @Input() creator: string;
  @Input() team: string;
  constructor(private stateService: StateService) { }

  ngOnInit() {
  }

  public leaveRoom(): void {
    this.stateService.leaveRoom();
  }
}
