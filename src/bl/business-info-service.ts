import {Injectable} from "@angular/core";
import {User} from "./auth-service";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2";
import {Observable} from "rxjs";
import {AFUnwrappedDataSnapshot} from "angularfire2/interfaces";

export class BusinessInfo{
  title: string;
  desc: string;
}

@Injectable()
export class BusinessInfoService{
  private ref: FirebaseObjectObservable<any>;

  constructor(private user: User, private db: AngularFireDatabase){
    this.ref = this.db.object(`apps/${this.user.uid}/definition`, { preserveSnapshot: true });
  }

  get(): Observable<BusinessInfo>{
    return this.ref.map(snap=>snap.val());
  }

  save(val: BusinessInfo): firebase.Promise<void>{
    return this.ref.set(val);
  }
}
