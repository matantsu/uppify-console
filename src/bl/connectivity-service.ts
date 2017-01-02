import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2";
import {Observable} from "rxjs";
@Injectable()
export class ConnectivityService{
  constructor(private db: AngularFireDatabase){}

  onConnectionStatusChanged(): Observable<boolean>{
    return this.db.object('.info/connected').map(o=>o.$value);
  }
}
