import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public hasJoinedRoom = new BehaviorSubject<boolean>(false);
  public room = new BehaviorSubject<any>(null);
  constructor() {
  }

  public roomWasJoined(): Observable<boolean> {
    return this.hasJoinedRoom.asObservable();
  }

  public joinRoom(room: any): void {
    this.hasJoinedRoom.next(true);
    this.room.next(room);
  }

  public leaveRoom(): void {
    this.hasJoinedRoom.next(false);
    this.room.next(null);
  }
}
