import { Component, ElementRef, Inject, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DateInputComponent } from 'src/app/components/date-input/date-input.component';
import { Reception } from 'src/app/models/Reception'
import { MatSort } from '@angular/material/sort';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PosteCommande } from 'src/app/models/PosteCommande';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-postes-commande-grid',
  templateUrl: './postes-commande-grid.component.html',
  styleUrls: ['./postes-commande-grid.component.scss']
})
export class PostesCommandeGridComponent implements OnInit{

  
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

displayedColumns: string[] = [ 'select','ncommande', 'nposte','unite_sortie', 'unite_achat', 'conv_facteur','qte_cde', 'qte_a_recevoir','mnemref','designation'];
datasource:any;
datatoExportExcel:any;
data:any;
selection = new SelectionModel<PosteCommande>(true, []);


constructor( @Inject(MAT_DIALOG_DATA) dataGrid:any, private ref:MatDialogRef<PostesCommandeGridComponent>){

 
  this.data = dataGrid;
 
}

ngOnInit(): void {
    
 
    this.datasource = new MatTableDataSource<PosteCommande>(this.data);
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
    this.datatoExportExcel = this.data
    
 
  }



  /** Whether the number of selected elements matches the total number of rows. */
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
    checkboxLabel(row?: PosteCommande): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${1 + 1}`;
    }
close(){
    
  this.ref.close('')
} 

selectRows(){
 
  this.ref.close(this.selection.selected)
}
}
