import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Reception } from 'src/app/models/Reception';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent {

@ViewChild('content') el!: ElementRef;
datasource!:any;
receptions!: Reception[]
constructor( @Inject(MAT_DIALOG_DATA) data:any){

  this.datasource = data;
  this.receptions = data
}
dateOfBon = '30/12/2022'

  pdfDownload(){

   // console.log(this.datasource)
/*
     let pdf = new jsPDF('p','pt','a4');
      pdf.html(this.el.nativeElement,{
            callback:(pdf)=>{
                  pdf.save("report.pdf");
            }
      })

  let doc = new jsPDF();
  let pageHeight= doc.internal.pageSize.height;
  
  // Before adding new content
  let y = 500 // Height position of new content
  if (y >= pageHeight)
  {
    doc.addPage();
    y = 0 // Restart height position
  }
  pdf.html(this.el.nativeElement,{
    callback:(pdf)=>{
          pdf.save("report.pdf");
    }
})
*/
let doc = new jsPDF();
autoTable(doc, {
  head: [['Name', 'Email', 'Country']],
  body: [
    ['David', 'david@example.com', 'Sweden'],
    ['Castille', 'castille@example.com', 'Spain'],
    
  ],
})

doc.save('table.pdf')
//document.getElementById('buttons').style.visibility = 'hidden';
  }

}


