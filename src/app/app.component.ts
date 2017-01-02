import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {Platform, NavController, MenuController, ViewController, LoadingController} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import {AngularFire} from "angularfire2/index";
import {SignInPage} from "../pages/sign-in/sign-in";
import {SetupPage} from "../pages/setup/setup";
import {DashboardPage} from "../pages/dashboard/dashboard";
import {BusinessInfoPage} from "../pages/business-info/business-info";
import 'rxjs/Rx';
import {Observable} from "rxjs/Rx";
import {AuthService, User} from "../bl/auth-service";
import {AppService} from "../bl/app-service";
import {ConnectivityService} from "../bl/connectivity-service";
import {NoConnectionPage} from "../pages/no-connection/no-connection";

@Component({
  templateUrl: 'app.html'
})
export class UppifyConsole implements AfterViewInit{
  currentUser: User;

  @ViewChild('nav') nav: NavController;
  rootPage = SignInPage;

  DashboardPage = DashboardPage;
  BusinessInfoPage = BusinessInfoPage;
  private loading;

  constructor(private authService: AuthService, private af: AngularFire, private platform: Platform,public loadingCtrl: LoadingController, private connectivityService: ConnectivityService) {
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

    this.connectivityService.onConnectionStatusChanged()
      .flatMap(connection=>{
        if(connection)
          return this.authService.changes().map(user=>user ? DashboardPage : SignInPage);
        else
          return Observable.of(NoConnectionPage);
      })
      .subscribe(page=>this.navigate(page));
  }

  logout(){
    this.authService.logout();
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
      this.nav.getActive().component != SetupPage &&
      this.nav.getActive().component != NoConnectionPage;
  }
}
