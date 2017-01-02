import {NgModule} from "@angular/core";
import {AuthMethods, AuthProviders, AngularFireModule, AngularFire} from "angularfire2";
import {AuthService, User} from "./auth-service";
import {BusinessInfoManager} from "./business-info";
import {AppService} from "./app-service";
import {BusinessInfoService} from "./business-info-service";
import {ConnectivityService} from "./connectivity-service";

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
  imports:[
    AngularFireModule.initializeApp(firebaseConfig,myFirebaseAuthConfig),
  ],
  providers:[
    AuthService,
    BusinessInfoService,
    {provide: User, useFactory: (authService: AuthService)=>authService.getUser(), deps:[AuthService]},
    ConnectivityService
  ],
  exports:[
    AngularFireModule,
  ]
})
export class BLModule{

}
