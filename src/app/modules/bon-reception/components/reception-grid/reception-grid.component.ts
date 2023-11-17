import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DateInputComponent } from 'src/app/components/date-input/date-input.component';
import { Reception } from 'src/app/models/Reception'
import { MatSort } from '@angular/material/sort';
import { BonReceptionService } from '../../bon-reception.service';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetailsReceptionGridComponent } from '../details-reception-grid/details-reception-grid.component';
import { CustomPaginator } from 'src/app/custom/CustomPaginatorConfiguration';
import { ReceptionFormComponent } from '../reception-form/reception-form.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AlertDialogComponent } from 'src/app/components/alert-dialog/alert-dialog.component';
@Component({
  selector: 'app-reception-grid',
  templateUrl: './reception-grid.component.html',
  styleUrls: ['./reception-grid.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }  // Here
  ]
})
export class ReceptionGridComponent {

    
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
@ViewChild(DateInputComponent,{static:true}) dateComp!:DateInputComponent

displayedColumns: string[] = [ 'ncommande', 'refreception','fournisseur', 'libelle_four', 'devise', 'datereception','nb_postes', 'action'];
datasource:any;
datatoExportExcel:any;
showPanel = false;
data:any;
rowData:any;
pdfsource:any = 'bon-rec'
toSend={
  'date':'string'
};
table:any[];
dataDialog:{
  title: string,
  message: string
} = {title:"",message:""};
constructor(private apiServ:BonReceptionService, private gserv:GlobalService, private dialog:MatDialog, private dialog2:MatDialog){

}
ngOnInit() {
  

}

getDate(date:string){
  
  this.toSend.date=this.gserv.formatStringDate(date)
  this.apiServ.getBonReceptions(this.toSend).subscribe({

    next:(res)=>{

      this.table = res.data
      if(this.table.length != 0){
      this.datasource = new MatTableDataSource<Reception>(res.data);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      this.data = res.data;
      this.datatoExportExcel = res.data;
      this.showPanel = true;
      }else {

  
        this.dataDialog.title = "Alerte"
        this.dataDialog.message = "Aucune Reception à cette date"
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

getRow(row:any){

//this.rowData = row['details']

}

displayDetailsReception(el:any){

 
  this.rowData = el['details'];
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.data=this.rowData;
  const popup= this.dialog.open(DetailsReceptionGridComponent,dialogConfig);

}

displayReception(el:any){
  
  this.rowData = el;
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.data=this.rowData;
  const popup= this.dialog.open(ReceptionFormComponent,dialogConfig);
}


printReception(el:any){

  //get details of seleted reception from datasource
  let receptionToPrint:any;
  for(let item of this.data){
      if(item.refreception === el.refreception){
        receptionToPrint = item;
        break
      }
  }

  let doc = new jsPDF('l','px','a4');
  let nb_page = 1;

  
  let arr_details_total = new Array()
   
  let tot_val_dinar = 0;
  let tot_val_dev = 0;


  let total_pages_par_reception = this.calculerNbPages(el);


  receptionToPrint['details'].forEach(function(et:any){

            let arr_details = new Array()
            arr_details.push(et['poste'])
            arr_details.push(et['stockcode'])
            arr_details.push(et['mnemref'])
            arr_details.push(et['designation'])
            arr_details.push(et['unite'])
            arr_details.push(et['qterecu'])
            arr_details.push(et['prixdev'])
            arr_details.push(et['valendevise'])
            arr_details.push(et['valendinar'])   
            arr_details.push(et['magasin'])
            
            arr_details_total.push(arr_details)

            tot_val_dinar = tot_val_dinar + +et['valendinar'];
            tot_val_dev = tot_val_dev + +et['valendevise'];

  })
 

      arr_details_total.push([{content: `TOTAL RECEPTION :                                                                                                                                                                                       `+tot_val_dev.toFixed(3)+'          '+tot_val_dinar.toFixed(3), colSpan: 10, 
      styles: { fillColor: [239, 154, 154] }
      }])
           //these variables to use in header of pages
           let datereception = receptionToPrint['datereception'];
           let ncommande = receptionToPrint['ncommande'];
           let refreception = receptionToPrint['refreception'];
           let fourn = receptionToPrint['fournisseur'];
           let libelle = receptionToPrint['libelle_four'];
           let devise = receptionToPrint['devise'];
           let pconv = receptionToPrint['details'][0]['pconv'];

          
           
           autoTable(doc, {
              head: [['POSTE', 'STOCKCODE', 'ARTICLE','DESIGNATION','UNITE','QTE.R','PRIX UNIT','VAL EN DEV','VALEUR EN DT','MG']],
              body: arr_details_total,
              margin:{top:100,bottom:0},
              rowPageBreak:'avoid',
              didDrawPage:function(data){
             
            

              doc.setFont('Times','bold')   
              doc.setFontSize(14)    
              doc.text('BON DE RECEPTION DU : '+datereception,doc.internal.pageSize.getWidth()/3, 20)                    
              doc.setFont('Times','normal')
              doc.setFontSize(12)
              doc.text('REFERENCE FACTURE .....................',30,50)
              doc.text('AUTRES REFERENCES .....................',250,50)
              doc.text('PAGE: ',560,50)
              doc.text(String(nb_page)+'/'+String(total_pages_par_reception),585,50)
              doc.text('Numéro : ....................',30,60)
              doc.text('Bon de Livraison : ....................',250,60)
              doc.text('Date : ....................',30,70)
              doc.text('Fiche de Transit : ....................',250,70)
              doc.text('N°  : ....................',400,70)
              doc.setFont('Times','bold') 
              doc.text('N°COMMANDE: ',30,90)
              doc.setFont('Times','normal') 
              doc.text(ncommande,100,90)
              doc.setFont('Times','bold') 
              doc.text('REF-RECEPT:',140,90)
              doc.setFont('Times','normal') 
              doc.text(refreception,200,90)
              doc.setFont('Times','bold') 
              doc.text('FOURNIS: ',235,90)
              doc.setFont('Times','normal') 
              doc.text(fourn+' '+libelle,280,90)
              doc.setFont('Times','bold') 
              doc.text('DEVISE: ',470,90)
              doc.setFont('Times','normal') 
              doc.text(devise,510,90)
              doc.setFont('Times','bold') 
              doc.text('P-CONV: ',540,90)
              doc.setFont('Times','normal') 
              doc.text(pconv,580,90)

              nb_page++;
             }
            
            })
            
            doc.addPage();
     
          //delete last empty page
          doc.deletePage(doc.getNumberOfPages());
          doc.save('report.pdf')
}

calculerNbPages(el:any){


  //get details of seleted reception from datasource
  let receptionToPrint:any;
  for(let item of this.data){
      if(item.refreception === el.refreception){
        receptionToPrint = item;
        break
      }
  }



  let doc = new jsPDF('l','px','a4');
  let nb_page = 1;

  
  let arr_details_total = new Array()
   
  let tot_val_dinar = 0;
  let tot_val_dev = 0;

  receptionToPrint['details'].forEach(function(et:any){

            let arr_details = new Array()
            arr_details.push(et['poste'])
            arr_details.push(et['stockcode'])
            arr_details.push(et['mnemref'])
            arr_details.push(et['designation'])
            arr_details.push(et['unite'])
            arr_details.push(et['qterecu'])
            arr_details.push(et['prixdev'])
            arr_details.push(et['valendevise'])
            arr_details.push(et['valendinar'])   
            arr_details.push(et['magasin'])
            
            arr_details_total.push(arr_details)

            tot_val_dinar = tot_val_dinar + +et['valendinar'];
            tot_val_dev = tot_val_dev + +et['valendevise'];

  })
 

      arr_details_total.push([{content: `TOTAL RECEPTION :                                                                                                                                                                                       `+tot_val_dev.toFixed(3)+'          '+tot_val_dinar.toFixed(3), colSpan: 10, 
      styles: { fillColor: [239, 154, 154] }
      }])
          
           let total_pages_par_reception = 0
           autoTable(doc, {
              head: [['POSTE', 'STOCKCODE', 'ARTICLE','DESIGNATION','UNITE','QTE.R','PRIX UNIT','VAL EN DEV','VALEUR EN DT','MG']],
              body: arr_details_total,
              margin:{top:100,bottom:0},
              rowPageBreak:'avoid',
              didDrawPage:function(data){
             
                total_pages_par_reception++
             
             }
            
            })
         return    total_pages_par_reception
         
}
}


