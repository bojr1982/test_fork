import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Commande } from 'src/app/models/Commande';
import { PosteCommande } from 'src/app/models/PosteCommande';
import { GlobalService } from 'src/app/services/global.service';
import { DocReceptionService } from '../../doc-reception.service';
import { PostesCommandeGridComponent } from '../postes-commande-grid/postes-commande-grid.component';


@Component({
  selector: 'app-doc-reception-grid-v2',
  templateUrl: './doc-reception-grid-v2.component.html',
  styleUrls: ['./doc-reception-grid-v2.component.scss']
})
export class DocReceptionGridV2Component {

    
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns: string[] = [ 'ncommande', 'fournisseur','libelle_four', 'datecommande', 'devise', 'nbpostes','nbpostes_termine','action'];
  datasource:any;
  datatoExportExcel:any;
  showPanel = false;
  data:any;
  commandList:any;
  pdfData:PosteCommande[] = [];
  pdfsource:any = 'doc-rec'
  toSend={
    'ncommande':'string'
  }
 
  
  constructor(private apiServ:DocReceptionService, private gserv:GlobalService, private dialog:MatDialog){
  
  }
  ngOnInit() {
    
  }
  
  getListCommandes(commandList:any){
    
   
        this.commandList =commandList;
        this.datasource = new MatTableDataSource<Commande>(commandList);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
        this.data = commandList;
        this.datatoExportExcel = commandList;
        this.showPanel = true;
        this.pdfData = commandList;
    
        
        
       
  }
  filterChange(event:any){
    let valueFilter = (event.target as HTMLInputElement).value;
    this.datasource.filter = valueFilter;
    this.datatoExportExcel = this.datasource.filteredData;
  }

  
   selectPostesCommande(el:any){
    
 
    const dialogConfig = new MatDialogConfig();
       dialogConfig.disableClose = true;
       dialogConfig.data=el.postes;
   
    const popup= this.dialog.open(PostesCommandeGridComponent,dialogConfig);
    
    let dataTopdf:any = this.pdfData;
    popup.afterClosed().subscribe(
      data => {
             if(data.length != 0){
             dataTopdf.forEach(function(value2:any){
                          if (data[0].ncommande == value2.ncommande){
                            value2.postes = data
                          }
                        })
       
                      }
      
      }
  ); 

     

  }
  
  removeCommande(el:any){
 
    let index  = this.commandList.indexOf(el);
    if (index !== -1) {
      this.commandList.splice(index, 1);
    }
    this.getListCommandes(this.commandList)
    if(this.commandList.length == 0){
      this.showPanel = false
    }
  }
}
