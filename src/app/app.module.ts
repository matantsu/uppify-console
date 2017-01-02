import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { UppifyConsole } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import {SignInPage} from "../pages/sign-in/sign-in";
import {SetupPage} from "../pages/setup/setup";

import {UppifyAppModule} from "../../../uppify-app/src/app/app.module";
import {BusinessInfoPage} from "../pages/business-info/business-info";
import {BLModule} from "../bl/BL";
import {NoConnectionPage} from "../pages/no-connection/no-connection";

@NgModule({
  declarations: [
    UppifyConsole,
    DashboardPage,
    SetupPage,
    SignInPage,
    BusinessInfoPage,
    NoConnectionPage,
  ],
  imports: [
    IonicModule.forRoot(UppifyConsole,{mode: 'wp'}),
    UppifyAppModule,
    BLModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    UppifyConsole,
    DashboardPage,
    SetupPage,
    SignInPage,
    BusinessInfoPage,
    NoConnectionPage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
