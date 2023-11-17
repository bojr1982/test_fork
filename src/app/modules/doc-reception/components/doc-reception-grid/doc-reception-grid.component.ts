import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Commande } from 'src/app/models/Commande';
import { PosteCommande } from 'src/app/models/PosteCommande';
import { GlobalService } from 'src/app/services/global.service';
import { DocReceptionService } from '../../doc-reception.service';
import { CommandeFormComponent } from '../commande-form/commande-form.component';


@Component({
  selector: 'app-doc-reception-grid',
  templateUrl: './doc-reception-grid.component.html',
  styleUrls: ['./doc-reception-grid.component.scss']
})
export class DocReceptionGridComponent {

  

    
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

displayedColumns: string[] = [ 'ncommande', 'nposte','unite_sortie', 'unite_achat', 'conv_facteur', 'qte_a_recevoir','mnemref','designation'];
datasource:any;
datatoExportExcel:any;
showPanel = false;
data:any;
rowData:any;
pdfsource:any = 'doc-rec'
toSend={
  'ncommande':'string'
}
commande:Commande = {
  ncommande:'',
  fournisseur:'        ',
  libelle_four:'       ',
  datecommande:new Date(),
  devise:'',
  nbpostes:0,
  nbpostes_termine:0,
  postes:[]

};

constructor(private apiServ:DocReceptionService, private gserv:GlobalService, private dialog:MatDialog){

}
ngOnInit() {
  
}

getCommande(ncommande:any){
  
  this.toSend.ncommande=ncommande
  this.apiServ.getCommandes(this.toSend).subscribe({

    next:(res)=>{
     
      this.datasource = new MatTableDataSource<PosteCommande>(res.data[0]['postes']);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      this.data = res.data;
      this.datatoExportExcel = res.data;
      this.showPanel = true;
      this.commande = res.data[0]
     
      
    },
    error:(err)=>{
      
    }
  })


}
filterChange(event:any){
  let valueFilter = (event.target as HTMLInputElement).value;
  this.datasource.filter = valueFilter;
}

getRow(row:any){

//this.rowData = row['details']

}


displayCommande(el:any){
  
  this.rowData = el;
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.enterAnimationDuration = '600ms';
  dialogConfig.exitAnimationDuration = '1000ms';
  dialogConfig.width='400px';
  dialogConfig.height='70%';
  dialogConfig.maxWidth='100%'
  dialogConfig.data=this.rowData;
  const popup= this.dialog.open(CommandeFormComponent,dialogConfig);
}



}
