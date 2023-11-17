import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocReceptionService {

  APIUrl = environment.APIUrl
  constructor(private  http:HttpClient) { }

  getCommandes(val:any){
    return this.http.post<any>(this.APIUrl + "recep/doc-recep", val);
  }
  getListeCommandes(){
    return this.http.get(this.APIUrl + "recep/doc-recep/command_list");
  }
  getSelectedCommandes(val:any){
    return this.http.post<any>(this.APIUrl + "recep/doc-recep/selected_command", val);
  }
}
