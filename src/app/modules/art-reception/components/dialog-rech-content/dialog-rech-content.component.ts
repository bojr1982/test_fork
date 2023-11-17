import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertDialogComponent } from 'src/app/components/alert-dialog/alert-dialog.component';
import { Article } from 'src/app/models/Article';
import { ArtReceptionService } from '../../art-reception.service';


@Component({
  selector: 'app-dialog-rech-content',
  templateUrl: './dialog-rech-content.component.html',
  styleUrls: ['./dialog-rech-content.component.scss'],
 
})
export class DialogRechContentComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns: string[] = [ 'select','mnemonic', 'reference','stockcode', 'preference'];
  datasource:any;
  selection = new SelectionModel<Article>(true, []);
  closeProgressBar:boolean = true;
  dataToSend:{data:string, from:string} = {data:'',from:''};
  stk:string;
  dataDialog:{
    title: string,
    message: string
  } = {title:"",message:""}
 
  table:any[];
  constructor(private api:ArtReceptionService, private dialog:MatDialog, private ref:MatDialogRef<DialogRechContentComponent>){

  }

  ngOnInit() {

   
          this.api.getListeArticles().subscribe({
        
            next:(res)=>{
         
              
              this.datasource = new MatTableDataSource<Article>(res['data']);    
              this.datasource.paginator = this.paginator;
              this.datasource.sort = this.sort;     
              this.closeProgressBar = false; 
          

            },
            error:(err)=>{
              
            }
          })
  
  


  }


  filterChange(event:any){
    let valueFilter = (event.target as HTMLInputElement).value;
    this.datasource.filter = valueFilter;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datasource.data.length;
    return numSelected === numRows;
  }

   /** Selects all rows if they are not all selected; otherwise clear selection. */
   toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.datasource.data);
  }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Article): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${1 + 1}`;
    }

close(){
  this.ref.close();
    }

rechercher(){


  if (this.selection.selected.length == 1){

        this.stk = this.selection.selected[0]['stockcode'];
        this.dataToSend = {data:this.stk,from:"postReceptionList"}
        this.ref.close(this.selection.selected);
        this.api.getListeReceptionParArticle(this.dataToSend).subscribe({
        
          next:(res)=>{
            this.table = res['data']
            if(this.table.length != 0){
            this.api.datasource.emit(res['data']) 
            }
            else {

  
              this.dataDialog.title = "Alerte"
              this.dataDialog.message = "Aucune reception pour cet article"
              const dialogConfig = new MatDialogConfig();
              dialogConfig.disableClose = true;
              dialogConfig.data= this.dataDialog;
              this.dialog.open(AlertDialogComponent,dialogConfig)
                }
          },
          error:(err)=>{
            
          }
        })
}else{

      this.dataDialog.title = "Alerte"
      this.dataDialog.message = "Veuillez choisir un seul article"
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.data= this.dataDialog;
      this.dialog.open(AlertDialogComponent,dialogConfig)
}

}    
}
