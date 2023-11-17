import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhosphatesService {


  APIUrl = environment.APIUrl
  constructor(private http:HttpClient) { }

  uploadFile(val:any){
   
    return this.http.post(this.APIUrl + "analyse/predict", val, { responseType: 'blob' });
  }

 
}





