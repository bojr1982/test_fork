import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertDialogComponent } from 'src/app/components/alert-dialog/alert-dialog.component';
import { DateInputComponent } from 'src/app/components/date-input/date-input.component';
import { DataToEmit } from 'src/app/interfaces/dataToEmit.interface';
import { HnModel } from 'src/app/models/HnModel';
import { GlobalService } from 'src/app/services/global.service';
import { DmService } from '../../dm.service';

@Component({
  selector: 'app-hn',
  templateUrl: './hn.component.html',
  styleUrls: ['./hn.component.scss']
})
export class HnComponent {


      
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
@ViewChild(DateInputComponent,{static:true}) dateComp!:DateInputComponent

displayedColumns: string[] = [ 'ndm','mag', 'nordre','mnemonic', 'reference', 'designation', 'unite','quantite','livraison','total'];
datasource:any;
datatoExportExcel:any;
showPanel = false;
data:any;
rowData:any;
pdfsource:any = 'hn-dm'
toSend={
  'date':'string',
  'stock':true
}
dateTreated:any;
table:any[];
dataDialog:{
  title: string,
  message: string
} = {title:"",message:""};




constructor(private apiServ: DmService, private gserv:GlobalService, private dialog:MatDialog){

}
ngOnInit() {
  

}

getDate(data:DataToEmit){
  
  this.toSend.date = this.gserv.formatStringDate(data.date)
  this.toSend.stock = data.stock
  this.dateTreated = this.gserv.formatStringDate(data.date)
  
  this.apiServ.getHn(this.toSend).subscribe({

    next:(res)=>{

      this.table = res.data
      if(this.table.length != 0){
      this.datasource = new MatTableDataSource<HnModel>(res.data);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      this.data = res.data;
      this.datatoExportExcel = res.data;
      this.showPanel = true;
    }else {

  
  this.dataDialog.title = "Alerte"
  this.dataDialog.message = "Aucun Dm avec cette date"
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.data= this.dataDialog;
  this.dialog.open(AlertDialogComponent,dialogConfig)
    }
    },
    error:(err)=>{
      
    }
  })



}
filterChange(event:any){
  let valueFilter = (event.target as HTMLInputElement).value;
  this.datasource.filter = valueFilter;
  this.datatoExportExcel = this.datasource.filteredData;
 
}


}
