import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {Platform, NavController, MenuController, ViewController, LoadingController} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import {AngularFire} from "angularfire2/index";
import {SignInPage} from "../pages/sign-in/sign-in";
import {SetupPage} from "../pages/setup/setup";
import {DashboardPage} from "../pages/dashboard/dashboard";
import {BasicInfoPage} from "../pages/basic-info/basic-info";
import 'rxjs/Rx';
import {Observable} from "rxjs/Rx";

@Component({
  templateUrl: 'app.html'
})
export class UppifyConsole implements AfterViewInit{
  @ViewChild('nav') nav: NavController;
  rootPage = SignInPage;

  DashboardPage = DashboardPage;
  BasicInfoPage = BasicInfoPage;
  private loading;

  constructor(public af: AngularFire, private platform: Platform,public loadingCtrl: LoadingController) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

  }

  ngAfterViewInit(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();

    this.af.auth.flatMap(a=>a ?
      this.af.database.object('defs/' + a.auth.uid, { preserveSnapshot: true })
        .map(d=> d.val() ? DashboardPage : SetupPage)
      : Observable.of(SignInPage))
    .subscribe(a=>this.navigate(a));
  }

  logout(){
    this.af.auth.logout();
  }

  navigate(page){
    if(this.loading){
      this.loading.dismiss();
      this.loading = null;
    }
    if(this.nav.getActive().component != page){
      this.nav.popToRoot();
      this.nav.push(page);
    }
  }

  isMenuEnabled(){
    return this.nav &&
      this.nav.getActive() &&
      this.nav.getActive().component != SignInPage &&
      this.nav.getActive().component != SetupPage;
  }
}
