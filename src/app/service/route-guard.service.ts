import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { BasicAuthenticationService } from './basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private basicAuthenticationService: BasicAuthenticationService,
    private router: Router) { }
    
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      if(this.basicAuthenticationService.isUserLoggedIn())
      return true;
      this.router.navigate(['login'])
      return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      if(LoginComponent.userLoggedIn.admin===true)
        return true;
       this.router.navigate([''])
       return false;
      
  
    }

}
