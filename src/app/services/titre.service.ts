import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TitreService {

  title = new Subject<string>();
  titleMsg = this.title.asObservable();
  constructor() {}

  sendMsg(message: string) {
    this.title.next(message);
  }


}
