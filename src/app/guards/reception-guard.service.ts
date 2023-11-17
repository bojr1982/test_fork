import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ReceptionGuardService implements CanActivate{

  constructor(private authServ:AuthenticationService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {

    if(this.authServ.isAuthenticated()&& (this.authServ.getProfil() == 'user' || this.authServ.getProfil() == 'admin')){
  
      return true;
      
    }else return false;
      
  }
}
