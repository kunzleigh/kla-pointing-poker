import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() public displayName: string;
  @Input() public email: string;
  @Input() public photoURL: string;

  constructor() { }

  ngOnInit() {
  }

}
