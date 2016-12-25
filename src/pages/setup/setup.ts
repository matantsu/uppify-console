import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Platform} from "ionic-angular/index";
import {AngularFire, FirebaseApp} from "angularfire2/index";

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html'
})
export class SetupPage {
  step = 1;
  basicInfo: FormGroup;
  appInfo: FormGroup;
  styling: FormGroup;
  private logoStorageRef;

  constructor(@Inject(FirebaseApp) firebase, private formBuilder: FormBuilder,private af: AngularFire, public platform: Platform) {
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    let phoneRegex = /^0\d([\d]{0,1})([-]{0,1})\d{7}$/;

    this.basicInfo = this.formBuilder.group({
      businessName: ['', Validators.required],
      businessAddress: ['', Validators.required],
      ownerName: ['', Validators.required],
      ownerEmail: ['', [Validators.required, Validators.pattern(emailRegex)]],
      ownerPhone: ['', [Validators.required, Validators.pattern(phoneRegex)]],
    });
    this.appInfo = this.formBuilder.group({
      appName: ['', Validators.required],
      shortDesc: ['', Validators.required],
      fullDesc: ['', Validators.required],
    });
    this.styling = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });


    this.logoStorageRef = firebase.storage().ref('logo').child(this.af.auth.getAuth().uid);
  }

  next(){
    this.step++;
  }

  back(){
    this.step--;
  }

  finish(){
    this.af.database.object('defs/' + this.af.auth.getAuth().uid).set('hello');
  }
}
