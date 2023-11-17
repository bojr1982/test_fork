import {Component, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';



const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements OnInit{

  @Output() dateEvent:EventEmitter<string> = new EventEmitter()
  @ViewChild('input') inputDate!:ElementRef
  valueDate!:string
  div_n = 'div-container'
  valueDateInput:string;


  constructor(public dialog:MatDialog) {}
  ngOnInit(): void {

  }

  enableButton(){

    if(this.valueDateInput == undefined)
    return true
    else return false
  }  
submitForm():void{

this.valueDate = this.inputDate.nativeElement.value
this.dateEvent.emit(this.valueDate)

  
   }
}
