import {Component, OnInit} from '@angular/core';
import {DbService} from '../../services/db.service';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs/Observable';
import {TimerObservable} from 'rxjs/observable/TimerObservable';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public chat: any[];
  public chatRef: any;
  public newMessage: string;
  public currentUser: any;
  constructor(private _dbService: DbService, private _authService: AuthService) {
    this._dbService.readList(this._authService.session + '/chat').valueChanges().subscribe(chats => {
      this.chat = chats;
    });
    this.chatRef = this._dbService.getRef(this._authService.session + '/chat');
    this.currentUser = {
      displayName: this._authService.currentUser.displayName,
      uid: this._authService.currentUser.uid,
      email: this._authService.currentUser.email,
      img: this._authService.currentUser.photoURL,
      observer: false
    };
  }

  ngOnInit() {
  }

  sendMessage() {
    const chatMessage = {
      text: this.newMessage,
      user: this.currentUser,
      date: this.getDateString()
    };
    this.chatRef.push(chatMessage);
    this.newMessage = '';
  }

  private getDateString() {
    const date = new Date();
    return date.getMonth() + 1 + '/' + date.getDay() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()
      + ':' + date.getSeconds();
  }
}
