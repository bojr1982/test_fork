import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedIn:boolean = false
  profil:string

  constructor() { }

  login(){
    this.loggedIn = true
  }

  logout(){
    this.loggedIn = false
  }

  isAuthenticated(){
    return this.loggedIn
  }
   getProfil(){
    return this.profil
   }
   setProfil(profil:string){
       this.profil = profil
   }
}
