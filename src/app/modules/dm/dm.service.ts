import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DmService {

  APIUrl = environment.APIUrl
  constructor(private  http:HttpClient) { }

  getEn(val:any){
    return this.http.post<any>(this.APIUrl + "dm/en-dm", val);
  }

  getHn(val:any){
    return this.http.post<any>(this.APIUrl + "dm/hn-dm", val);
  }

  getListeMag(){
    return this.http.get<any>(this.APIUrl + "dm/list-mag");
  }

  getListeStk(){
    return this.http.get<any>(this.APIUrl + "dm/list-stk");
  }
}
