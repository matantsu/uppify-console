import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2";
import {User, AuthService} from "./auth-service";
import {Observable} from "rxjs";



@Injectable()
export class SetupService{
  private user: User;
  constructor(private authService: AuthService, private db: AngularFireDatabase){
    authService.changes().subscribe(user=>this.user = user);
  }

  isFinished(): Observable<boolean>{
    return this.authService.changes().flatMap(u=> u ? this.db.object(`apps/${u.uid}/setup`)
        .map(o=>!!o.$value) : Observable.of(true));
  }

  finish(): firebase.Promise<void>{
    return this.db.object(`apps/${this.user.uid}/setup`)
      .set(true);
  }
}
