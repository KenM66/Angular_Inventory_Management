import { Injectable } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor() { }

  authenticate(username: string, password: string){
    if ( username===LoginComponent.user && password===LoginComponent.pass){
      sessionStorage.setItem('authenticaterUser', username)
      return true;
    }
    return false;
  }

  isUserLoggedIn(){
    let user= sessionStorage.getItem('authenticaterUser')
    return !(user===null);
  }

  logout(){
    sessionStorage.removeItem('authenticaterUser')
  }
}
