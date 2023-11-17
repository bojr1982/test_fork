import { MatSort } from '@angular/material/sort';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EnModel } from 'src/app/models/EnModel';
import { MatPaginator } from '@angular/material/paginator';
import { DateInputComponent } from 'src/app/components/date-input/date-input.component';
import { DmService } from '../../dm.service';
import { AlertDialogComponent } from 'src/app/components/alert-dialog/alert-dialog.component';
import { DataToEmit } from 'src/app/interfaces/dataToEmit.interface';


@Component({
  selector: 'app-en',
  templateUrl: './en.component.html',
  styleUrls: ['./en.component.scss']
})
export class EnComponent {


     
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
@ViewChild(DateInputComponent,{static:true}) dateComp!:DateInputComponent

displayedColumns: string[] = [ 'chapitre', 'nordre', 'nomenclature', 'designation', 'unite','quantite','livraison','total'];
datasource:any;
datatoExportExcel:any;
showPanel = false;
data:any;
rowData:any;
pdfsource:any = 'en-dm'
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
  
  this.apiServ.getEn(this.toSend).subscribe({

    next:(res)=>{

      this.table = res.data
    if(this.table.length != 0){
      this.datasource = new MatTableDataSource<EnModel>(res.data);
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

