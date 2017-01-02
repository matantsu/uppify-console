import {Injectable} from "@angular/core";
import {AngularFire, AngularFireAuth, FirebaseAuthState, AuthProviders, AuthMethods} from "angularfire2";
import {Observable} from "rxjs";

export class User{
  uid: string;
  displayName: string;
  email: string;
  photoUrl: string;
}

@Injectable()
export class AuthService{
  private static AUTH_METHOD: AuthMethods = AuthMethods.Popup;
  private user: User;

  constructor(private auth: AngularFireAuth){}

  loginWithFacebook(): void{
    this.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthService.AUTH_METHOD,
    })
  }

  loginWithGoogle(): void{
    this.auth.login({
      provider: AuthProviders.Google,
      method: AuthService.AUTH_METHOD,
    })
  }

  loginWithTwitter(): void{
    this.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthService.AUTH_METHOD,
    })
  }

  loginWithEmail(email: string, password: string): void{
    this.auth.login({
      email: email,
      password: password
    })
  }

  logout(): void{
    this.auth.logout();
  }

  changes(): Observable<User>{
    return this.auth.map((a)=>this.authToUser(a)).do(u=>this.user = u);
  }

  isLoggedIn(): boolean{
    return !!this.auth.getAuth();
  }

  private authToUser(a: FirebaseAuthState): User {
    if(a && a.auth && a.auth.uid){
      let user = new User();
      user.uid = a.auth.uid;
      user.displayName = a.auth.displayName || a.auth.email || 'No name';
      user.email = a.auth.email;
      user.photoUrl = a.auth.photoURL;
      return user;
    }
    else
      return null;
  }

  getUser(): User {
    return this.user;
  }
}
