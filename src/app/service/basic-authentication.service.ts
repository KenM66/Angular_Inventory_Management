import { Injectable } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor() { }

  authenticate(username: string, password: string){
    if ( username===LoginComponent.usernm && password===LoginComponent.pass){
      sessionStorage.setItem('authenticaterUser', username);
    
      
      return true;
    }
    return false;
  }

  isUserLoggedIn(){
    let user= sessionStorage.getItem('authenticaterUser');
    return !(user===null);
  }

  logout(){
    setTimeout(()=>{
      
     sessionStorage.removeItem('authenticaterUser');
     
 
    });
  }
}
