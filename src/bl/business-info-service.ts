import {Injectable, Inject} from "@angular/core";
import {User} from "./auth-service";
import {AngularFireDatabase, FirebaseObjectObservable, FirebaseApp} from "angularfire2";
import {Observable} from "rxjs";

export class Hour{
  day: number = 0;
  start: string = '08:00';
  end: string = '18:30';
}

export class ContactInfo{
  name: string;
  email: string;
  phone: string;
}

export class BusinessInfo{
  name: string;
  slogan: string;
  shortDesc: string;
  desc: string;
  address: string;

  contactInfo: ContactInfo = new ContactInfo();

  openingHours: Hour[] = [];
}

@Injectable()
export class BusinessInfoService{
  private ref: FirebaseObjectObservable<any>;
  private logoRef: firebase.storage.Reference;
  private coverPhotoRef: firebase.storage.Reference;

  constructor(private user: User, private db: AngularFireDatabase, @Inject(FirebaseApp) private firebase: firebase.app.App){
    this.ref = this.db.object(`apps/${this.user.uid}/definition`, { preserveSnapshot: true });
    this.logoRef = firebase.storage().ref(`apps/${this.user.uid}`).child('logo');
    this.coverPhotoRef = firebase.storage().ref(`apps/${this.user.uid}`).child('coverPhoto');
  }

  getLogoRef(): firebase.storage.Reference{
    return this.logoRef;
  }

  getCoverPhotoRef(): firebase.storage.Reference{
    return this.coverPhotoRef;
  }

  get(): Observable<BusinessInfo>{
    return this.ref.map(snap=>snap.val()).first();
  }

  save(val: BusinessInfo): firebase.Promise<void>{
    return this.ref.set(val);
  }
}
