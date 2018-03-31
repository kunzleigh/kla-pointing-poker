import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { TeamComponent } from './components/team/team.component';
import { firebaseConfig } from '../environments/environment';
import { AuthService } from './services/auth.service';
import {PointGridComponent} from './components/point-grid/point-grid.component';

// Material
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatDividerModule, MatGridListModule, MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {FormsModule} from '@angular/forms';
import {DbService} from './services/db.service';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { ObserverComponent } from './components/observer/observer.component';
import { ChatComponent } from './components/chat/chat.component';
import { StagedUsersComponent } from './components/staged-users/staged-users.component';
import { WaitingComponent } from './components/waiting/waiting.component';
import {ThemeService} from './services/theme.service';
import {StagedUsersService} from './services/staged-users.service';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    TeamComponent,
    PointGridComponent,
    NavComponent,
    LoginComponent,
    ObserverComponent,
    ChatComponent,
    StagedUsersComponent,
    WaitingComponent
  ],
  entryComponents: [
    StagedUsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatDividerModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatDialogModule,
    MatChipsModule,
    FlexLayoutModule
  ],
  providers: [AuthService, DbService, ThemeService, StagedUsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
