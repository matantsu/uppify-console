import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire} from "angularfire2/index";

/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  platform: string = 'ios';

  constructor(private af: AngularFire){

  }
}
