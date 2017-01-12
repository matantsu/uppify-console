import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {Platform, NavController, MenuController, ViewController, LoadingController} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import {AngularFire} from "angularfire2/index";
import {SignInPage} from "../pages/sign-in/sign-in";
import {SetupPage} from "../pages/setup/setup";
import {DashboardPage} from "../pages/dashboard/dashboard";
import {BusinessInfoPage} from "../pages/business-info/business-info";
import 'rxjs/Rx';
import {Observable, Subscription} from "rxjs/Rx";
import {AuthService, User} from "../bl/auth-service";
import {AppService} from "../bl/app-service";
import {ConnectivityService} from "../bl/connectivity-service";
import {NoConnectionPage} from "../pages/no-connection/no-connection";
import {SetupService} from "../bl/setup-service";
import {AppAndWebsitePage} from "../pages/app-and-website/app-and-website";
import {ProductsAndServicesPage} from "../pages/products-and-services/products-and-services";
import {GalleryPage} from "../pages/gallery/gallery";
import {SocialNetworksPage} from "../pages/social-networks/social-networks";
import {StatisticsPage} from "../pages/statistics/statistics";

@Component({
  templateUrl: 'app.html'
})
export class UppifyConsole implements AfterViewInit{
  currentUser: User;

  @ViewChild('nav') nav: NavController;
  rootPage = SignInPage;

  DashboardPage = DashboardPage;
  BusinessInfoPage = BusinessInfoPage;
  AppAndWebsitePage = AppAndWebsitePage;
  ProductsAndServicesPage = ProductsAndServicesPage;
  GalleryPage = GalleryPage;
  SocialNetworksPage = SocialNetworksPage;
  StatisticsPage = StatisticsPage;

  private loading;
  private sub: Subscription;

  constructor(private authService: AuthService,
              private af: AngularFire,
              private platform: Platform,
              public loadingCtrl: LoadingController,
              private connectivityService: ConnectivityService,
              private setupService: SetupService) {
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

    this.subscribe();
  }

  subscribe(){
    this.sub = this.connectivityService.onConnectionStatusChanged()
      .flatMap(connection=>{
        if(connection)
          return this.authService.changes()
            .do(user=>this.currentUser = user)
            .flatMap(user=>{
              if(user)
                return this.setupService.isFinished()
                  .map(b=> b ? DashboardPage : SetupPage);
              else
                return Observable.of(SignInPage);
            });
        else
          return Observable.of(NoConnectionPage);
      })
      .subscribe(page=>this.navigate(page));
  }

  logout(){
    this.sub.unsubscribe();
    this.authService.logout();
    this.navigate(SignInPage)
      .then(p=>{
        this.subscribe();
      });
  }

  navigate(page){
    if(this.loading){
      this.loading.dismiss();
      this.loading = null;
    }
    if(this.nav.getActive().component != page){
      this.nav.popToRoot();
      return this.nav.push(page);
    }
    else
      return Promise.resolve(page);
  }

  isMenuEnabled(){
    return this.nav &&
      this.nav.getActive() &&
      this.nav.getActive().component != SignInPage &&
      this.nav.getActive().component != SetupPage &&
      this.nav.getActive().component != NoConnectionPage;
  }
}
