import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private _afDb: AngularFireDatabase) {
  }

  setProperty(location: string, value: any) {
    this._afDb.object(location).set(value);
  }

  readProperty(location: string) {
    return this._afDb.object(location);
  }

  readList(location: string) {
    return this._afDb.list(location);
  }

  removeProperty(location: string) {
    this._afDb.object(location).remove();
  }

  getRef(location: string) {
    return this._afDb.database.ref(location);
  }
}
