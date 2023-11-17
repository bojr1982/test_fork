import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { DataToEmit } from 'src/app/interfaces/dataToEmit.interface';




@Component({
  selector: 'app-date-component',
  templateUrl: './date-component.component.html',
  styleUrls: ['./date-component.component.scss']
})
export class DateComponentComponent{

 
  dataDialog:{
    title: string,
    message: string
  } = {title:"",message:""};

  
  
  @Output() dataEvent:EventEmitter<DataToEmit> = new EventEmitter()
  @ViewChild('input') inputDate!:ElementRef
  valueDate:string;
  div_n = 'div-container'
  dataToEmit:DataToEmit={date:'',stock:true}; 
  

  constructor(public dialog:MatDialog) {

    
  }
 

enableButton(){

  if(this.valueDate == undefined)
  return true
  else return false
}  
submitForm():void{

this.dataToEmit.date = this.inputDate.nativeElement.value

this.dataDialog.title = "Demande de Confirmation"
this.dataDialog.message = "DM Encore En Mode Stock "
const dialogConfig = new MatDialogConfig();
dialogConfig.disableClose = true;
dialogConfig.data= this.dataDialog;
const popup = this.dialog.open(ConfirmDialogComponent,dialogConfig);
popup.afterClosed().subscribe((response)=>{

  this.dataToEmit.stock = response;
  this.dataEvent.emit(this.dataToEmit)
})
  }


}


