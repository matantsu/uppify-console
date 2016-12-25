import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { UppifyConsole } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import {AngularFireModule, AuthMethods, AuthProviders} from "angularfire2/index";
import {SignInPage} from "../pages/sign-in/sign-in";
import {SetupPage} from "../pages/setup/setup";

import {UppifyApp} from "../../../uppify-app/src/app/app.component";
import {UppifyAppModule} from "../../../uppify-app/src/app/app.module";
import {BasicInfoPage} from "../pages/basic-info/basic-info";
import {FileUploadModule} from "ng2-file-upload/index";
import {UploadComponent} from "../upload/upload";

export const firebaseConfig = {
  apiKey: "AIzaSyBHhdmRW6FaUGvYYlWThvF9Dz7muvmECmI",
  authDomain: "uppify-46685.firebaseapp.com",
  databaseURL: "https://uppify-46685.firebaseio.com",
  storageBucket: "uppify-46685.appspot.com",
  messagingSenderId: "604287738717"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  declarations: [
    UppifyConsole,
    DashboardPage,
    SetupPage,
    SignInPage,
    BasicInfoPage,
    UploadComponent,
  ],
  imports: [
    IonicModule.forRoot(UppifyConsole,{mode: 'wp'}),
    AngularFireModule.initializeApp(firebaseConfig,myFirebaseAuthConfig),
    UppifyAppModule,
    FileUploadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    UppifyConsole,
    DashboardPage,
    SetupPage,
    SignInPage,
    BasicInfoPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
