import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Observable } from 'rxjs/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  public loggedInUsersObs: Observable<any[]>;
  public activeRoomsObs: Observable<any[]>;
  public newRoomForm: FormGroup;
  constructor(private db: DbService,
              private authService: AuthService,
              private fb: FormBuilder) {
    this.loggedInUsersObs = this.db.readList('users').valueChanges();
    this.activeRoomsObs = this.db.readList('rooms').valueChanges();
    this.newRoomForm = this.fb.group({
      name: ['', Validators.required],
      team: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  public createNewRoom(): void {
    if (this.newRoomForm.valid) {
      this.db.setProperty(`rooms/${uuid()}`, {
        name: this.newRoomForm.get('name').value,
        team: this.newRoomForm.get('team').value,
        creator: this.authService.authenticatedUser.value.displayName
      });
      this.newRoomForm.reset();
    }
  }
}
