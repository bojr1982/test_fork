import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data_to_sendInterface } from 'src/app/interfaces/data_to_send.interface';
import { ReceptionParArticle } from 'src/app/models/ReceptionParArticle';
import { GridCommandeComponent } from 'src/app/modules/doc-reception/components/grid-commande/grid-commande.component';
import { PostesCommandeGridComponent } from 'src/app/modules/doc-reception/components/postes-commande-grid/postes-commande-grid.component';
import { ArtReceptionService } from '../../art-reception.service';
import { DetailsArticleComponent } from '../details-article/details-article.component';
import { DialogRechContentComponent } from '../dialog-rech-content/dialog-rech-content.component';
@Component({
  selector: 'app-reception-par-article',
  templateUrl: './reception-par-article.component.html',
  styleUrls: ['./reception-par-article.component.scss']
})
export class ReceptionParArticleComponent implements OnInit{

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

displayedColumns: string[] = [ 'stockcode','refReception','datereception', 'nCommande',  'datecommande', 'qterecu','qte_cde','prix_devise','prix_local', 'action'];
datasource:any;
dataToExportExcel:any;
showPanel = false;
dataToSend:Data_to_sendInterface;

constructor(private api:ArtReceptionService,private dialog:MatDialog){

 
}

  ngOnInit(): void {
 
    this.api.datasource.subscribe((data:any) => {
      
      this.datasource = new MatTableDataSource<ReceptionParArticle>(data);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      this.dataToExportExcel = data;
      this.showPanel = true;
    }
    
    )

 
  }

  filterChange(event:any){
    let valueFilter = (event.target as HTMLInputElement).value;
    this.datasource.filter = valueFilter;
    this.dataToExportExcel = this.datasource.filteredData;
  
  }

  getDetailsArticle(row:any){
    
    this.dataToSend = {data:row.stockcode,from:'postDetailsArticle'}
    this.api.getListeReceptionParArticle(this.dataToSend).subscribe({
        
      next:(res)=>{
      
      
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.data=res['data'];
      const dialogRef = this.dialog.open(DetailsArticleComponent,dialogConfig);
      
      },
      error:(err)=>{
        
      }
    })
  }
  getDetailsCommande(row:any){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data=row['nCommande'];
    const dialogRef = this.dialog.open(GridCommandeComponent,dialogConfig);
  }

}

