import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DateInputComponent } from 'src/app/components/date-input/date-input.component';
import { Reception } from 'src/app/models/Reception'
import { MatSort } from '@angular/material/sort';
import { BonReceptionService } from '../../bon-reception.service';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-reception-grid',
  templateUrl: './details-reception-grid.component.html',
  styleUrls: ['./details-reception-grid.component.scss']
})
export class DetailsReceptionGridComponent {

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
@ViewChild(DateInputComponent,{static:true}) dateComp!:DateInputComponent

displayedColumns: string[] = ['poste', 'stockcode', 'mnemref', 'designation', 'unite', 'qterecu', 'prixdev', 'valendevise', 'valendinar', 'magasin'];
datasource:any;
datatoExportExcel:any;
data:any;
toSend={
  'date':'string'
}
refreception!:string;
ncommande!:string;


constructor(private apiServ:BonReceptionService, private gserv:GlobalService, @Inject(MAT_DIALOG_DATA) dataGrid:any, private ref:MatDialogRef<DetailsReceptionGridComponent>){

  this.datasource = dataGrid;
  this.refreception = this.datasource[0]['refreception'];
  this.ncommande = this.datasource[0]['ncommande']
  this.datatoExportExcel = dataGrid
}


getDate(date:string){
 
  this.toSend.date=this.gserv.formatDate(date)
  this.apiServ.getBonReceptions(this.toSend).subscribe({

    next:(res)=>{

      this.datasource = new MatTableDataSource<Reception>(res.data);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      this.data = res.data;
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

close(){
    
  this.ref.close()
} 

getTotalQte(){
  return this.datasource.map(t => t.qterecu).reduce((acc, value) => Number(acc) + Number(value), 0);
}

getTotalValDev(){
  return this.datasource.map(t => t.valendevise).reduce((acc, value) => Number(acc) + Number(value), 0);
}

getTotalValDinar(){
  return this.datasource.map(t => t.valendinar).reduce((acc, value) => Number(acc) + Number(value), 0);
}
}
