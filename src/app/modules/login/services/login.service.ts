import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "../../../services/global.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private global_var:GlobalService) { }

  APIUrl = environment.APIUrl

  register(val:any){

    return this.http.post<any>(this.APIUrl + "api/register",val);
  };

  login(val:any){

    return this.http.post<any>(this.APIUrl + "api/login",val);  // withCredentials:true for receive cookies
  }

  getUser(){
    return this.http.get(this.APIUrl + "api/user",{withCredentials: true})
  }

  logout(){

    return this.http.post(this.APIUrl + "api/logout",{}, {withCredentials: true})
  }
}
