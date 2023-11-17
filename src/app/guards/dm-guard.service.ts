import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DmGuardService implements CanActivate, CanActivateChild{

  constructor(private authServ:AuthenticationService) { }
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {

    if(this.authServ.isAuthenticated()&& (this.authServ.getProfil() == 'user' || this.authServ.getProfil() == 'admin')){
  
      return true;
      
    }else return false;
      
  }


  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    return this. canActivate(childRoute,state);
  }
}
