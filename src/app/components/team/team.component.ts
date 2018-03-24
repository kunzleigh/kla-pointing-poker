import {Component, OnInit} from '@angular/core';
import {DbService} from '../../services/db.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  users: any[];
  ticket: string;
  description: string;
  ticketNonce: number;
  votes: any[];
  percentVoted: number;
  pointSum: number;
  consensus: boolean;
  voterCount: number;
  constructor(private _dbService: DbService, private _authService: AuthService) {
    this.percentVoted = 0;
  }

  ngOnInit() {
    this._dbService.readList(this._authService.session + '/users').valueChanges().subscribe(users => {
      this.users = users;
      this.voterCount = this.howManyNonObservers();
    });
    this._dbService.readList(this._authService.session + '/votes').valueChanges().map(votes => {
      let tmpSum = 0;
      let tmpConsensus = false;
      let previousVote;
      votes.forEach((vote: any, index: number) => {
        tmpSum += vote.points;
        if (index === 0) {
          tmpConsensus = true;
          previousVote = vote.points;
        } else {
          tmpConsensus = tmpConsensus && previousVote === vote.points;
          previousVote = vote.points;
        }
      });
      this.pointSum = tmpSum;
      this.consensus = tmpConsensus;
      return votes;
    }).subscribe(votes => {
      this.votes = votes;
      if (this.users.length > 0) {
        this.percentVoted = (this.votes.length / this.voterCount) * 100;
      }
    });
    this._dbService.readProperty(this._authService.session + '/tickets/nonce').valueChanges().subscribe((nonce: number) => {
      this.ticketNonce = nonce === null ? 1 : nonce;
      this._dbService.readProperty(this._authService.session + '/tickets/' + this.ticketNonce).valueChanges()
        .subscribe((currentTicket: any) => {
          if (currentTicket) {
            this.ticket = currentTicket.ticket;
            this.description = currentTicket.description;
          } else {
            this.ticket = '';
            this.description = '';
            this.percentVoted = 0;
            this.votes = [];
            this.pointSum = 0;
            this._dbService.setProperty(this._authService.session + '/users/' + this._authService.currentUser.uid + '/hasVoted', false);
          }
        });
    });
  }

  pushTicket() {
    this._dbService.setProperty(this._authService.session + '/tickets/' + this.ticketNonce + '/ticket', this.ticket);
  }

  pushDescription() {
    if (this.ticket && this.description) {
      this._dbService.setProperty(this._authService.session + '/tickets/' + this.ticketNonce + '/description', this.description);
    }
  }

  clear() {
    this._dbService.setProperty(this._authService.session + '/tickets/nonce', ++this.ticketNonce);
    this._dbService.removeProperty(this._authService.session + '/votes/');
  }

  howManyNonObservers() {
    let tmpSum = 0;
    this.users.forEach(user => {
      if (!user.observer) {
        tmpSum++;
      }
    });
    return tmpSum;
  }

  saveAndClear() {
    this._dbService.setProperty(this._authService.session + '/tickets/' + this.ticketNonce + '/agreedPoints', this.votes[0].points);
    this._dbService.setProperty(this._authService.session + '/tickets/' + this.ticketNonce + '/uid', this.ticketNonce);
    this.clear();
  }
}
