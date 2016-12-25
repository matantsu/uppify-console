import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

/*
  Generated class for the SignIn page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html'
})
export class SignInPage {
  email: string;
  password: string;
  constructor(private af: AngularFire, public platform: Platform) {}

  fb(){
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    })
  }

  gp(){
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    })
  }

  tw(){
    this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup,
    })
  }

  withEmail(){
    this.af.auth.login({
      email: this.email,
      password: this.password
    })
  }
}
