import { Component } from '@angular/core';
import {AngularFire} from "angularfire2/index";

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  platform: string = 'ios';

  constructor(private af: AngularFire){

  }
}
