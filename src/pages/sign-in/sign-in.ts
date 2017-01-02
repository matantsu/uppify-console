import { Component } from '@angular/core';
import {AuthService} from "../../bl/auth-service";

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html'
})
export class SignInPage {
  email: string;
  password: string;
  constructor(private auth: AuthService) {}

  fb(){
    this.auth.loginWithFacebook();
  }

  gp(){
    this.auth.loginWithGoogle();
  }

  tw(){
    this.auth.loginWithTwitter();
  }

  withEmail(){
    this.auth.loginWithEmail(this.email,this.password);
  }
}
