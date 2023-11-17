import { Component, Input, OnInit, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Commande } from 'src/app/models/Commande';
import { DocReceptionService } from '../../doc-reception.service';

@Component({
  selector: 'app-grid-commande',
  templateUrl: './grid-commande.component.html',
  styleUrls: ['./grid-commande.component.scss']
})
export class GridCommandeComponent implements OnInit{


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns: string[] = [ 'ncommande', 'fournisseur','libelle_four', 'datecommande', 'devise', 'nbpostes','nbpostes_termine'];
  datasource:any;
  datatoExportExcel:any;
  showPanel = false;
  data:any;
  commandList:any;
  toSend:any = []

  constructor(@Inject(MAT_DIALOG_DATA) data:any,private apiServ:DocReceptionService){
  
      
     this.toSend.push(data)
  }
  ngOnInit(): void {
   
    this.apiServ.getSelectedCommandes(this.toSend).subscribe({
  
      next:(res)=>{

        this.datasource = new MatTableDataSource<Commande>(res['data']);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
     
        
      },
      error:(err)=>{
        
      }
    })
    

  }

}
