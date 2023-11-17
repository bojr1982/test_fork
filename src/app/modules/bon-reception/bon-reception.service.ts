import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BonReceptionService {

  APIUrl = environment.APIUrl
  constructor(private  http:HttpClient) { }

  getBonReceptions(val:any){
    return this.http.post<any>(this.APIUrl + "recep/all-recep", val);
  }

}
