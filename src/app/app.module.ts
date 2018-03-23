import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { PointCardComponent } from './components/point-card/point-card.component';
import { UserComponent } from './components/user/user.component';
import { TeamComponent } from './components/team/team.component';
import { firebaseConfig } from '../environments/environment';
import { AuthService } from './services/auth.service';
import {PointGridComponent} from './components/point-grid/point-grid.component';

// Material
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDividerModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatProgressBarModule,
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


@NgModule({
  declarations: [
    AppComponent,
    PointCardComponent,
    UserComponent,
    TeamComponent,
    PointGridComponent,
    NavComponent,
    LoginComponent,
    ObserverComponent
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
    FlexLayoutModule
  ],
  providers: [AuthService, DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
