import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtReceptionService {

  APIUrl = environment.APIUrl
  datasource:EventEmitter<any>  = new EventEmitter();
 
  constructor(private http: HttpClient) { }

  getListeArticles(){
    return this.http.get(this.APIUrl + "recep/recep-par-art/articles");
  }

  getListeReceptionParArticle(data:any){
    return this.http.post(this.APIUrl + "recep/recep-par-art/articles",data);
  }
  
  

 
}
