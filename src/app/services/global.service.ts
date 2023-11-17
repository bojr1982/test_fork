import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  sge = '';
  profil = '';

  private subject = new Subject<any>()
  constructor() { }

  formatDate(date:any) {
    
    let d = new Date(date),
    
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, day, month].join('-');
  }

  formatDateBySlash(date:any) {
    
    let d = new Date(date),
    
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join('/');
  }

  formatStringDate(date:string) {
    
    let year = date.slice(6),
        day = date.slice(0,2),
        month = date.slice(3,5)


    return [year, month, day].join('-');
  }
  dateReceived(dateObject: any){
    let ret = {
      'date':'',
      'flag':true
    }
    let d_start = this.formatDate(dateObject.start)
    let d_end = this.formatDate(dateObject.end)
    dateObject = {
      'd_start':d_start,
      'd_end':d_end
    }
    ret.date = dateObject
    return ret

  }

 sendData(data:any){
    this.subject.next(data);
 }

 getData():Observable<any>{
    return this.subject.asObservable()
 }

 reloadComponent(self:boolean,router:Router,urlToNavigateTo ?:string){
  //skipLocationChange:true means dont update the url to / when navigating
 console.log("Current route I am on:",router.url);
 const url=self ? router.url :urlToNavigateTo;
 router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
    router.navigate([`/${url}`]).then(()=>{
     console.log(`After navigation I am on:${router.url}`)
   })
 })
}

}
