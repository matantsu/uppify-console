import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SocialNetworksConnectPage} from "../social-networks-connect/social-networks-connect";
import {SocialNetworksFeedPage} from "../social-networks-feed/social-networks-feed";

/*
  Generated class for the SocialNetworks page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-social-networks',
  templateUrl: 'social-networks.html'
})
export class SocialNetworksPage {
  SocialNetworksConnectPage = SocialNetworksConnectPage;
  SocialNetworksFeedPage = SocialNetworksFeedPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialNetworksPage');
  }

}
