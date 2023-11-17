import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import {UserOptions} from 'jspdf-autotable';
import autoTable  from 'jspdf-autotable';
import { Cde_nbpageInterface } from 'src/app/interfaces/cde_nbpage.interface';
import { CommandeFormComponent } from 'src/app/modules/doc-reception/components/commande-form/commande-form.component';
import { ExportService } from 'src/app/services/export.service';
import { GlobalService } from 'src/app/services/global.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';


interface MyOptions extends UserOptions {
  didDrawRow?: (data: any) => void;
}

@Component({
  selector: 'app-toolbar-grid',
  templateUrl: './toolbar-grid.component.html',
  styleUrls: ['./toolbar-grid.component.css']
})

export class ToolbarGridComponent implements OnInit {

  @Input() exportdata!:any
  @Input() componentToExport!:any
  @Output() showModal: any = new EventEmitter<boolean>();
  @Input() hiddenButtonFilter:boolean = false
  @Input() datasource!:any;
  @Input() displayButtonExport:boolean =true;
  @Input() displayButtonPdf:boolean =true;
  @Input() displayButtondetailsCommande: boolean = false;
  @Input() documentPdf:string;
  @Input() dateTreated:string;
  @ViewChild('template') content!: ElementRef;

  dates:any
  displayPdfHtml = true;
  dataPdf:any = [];
  receptionDate!:string;


  constructor( private gserv:GlobalService,private route:Router, private dialog:MatDialog, private expServ:ExportService) {

 
   }
  

  ngOnInit(): void {
 
  }

  
  detailsCommande(){
   
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.enterAnimationDuration = '600ms';
    dialogConfig.exitAnimationDuration = '1000ms';
    dialogConfig.width='400px';
    dialogConfig.height='70%';
    dialogConfig.maxWidth='100%'
    dialogConfig.data=this.datasource[0];
    const popup= this.dialog.open(CommandeFormComponent,dialogConfig);

    }

  csvDownload(){

  let dateToExport = new Array();
  let dToExport = new Array();

 
  switch (this.componentToExport){
      case 'reception':
        let ligne1: {
          ncommande:string,
          refreception:string,
          fournisseur:string,
          libelle_four:string,
          devise:string,
          datereception:string
       }
            this.exportdata.forEach(function (value:any) {
              ligne1 = {
                ncommande: value.ncommande,
                refreception: value.refreception,
                fournisseur: value.fournisseur,
                libelle_four: value.libelle_four,
                devise: value.devise,
                datereception: value.datereception
            };
              
              dateToExport.push(ligne1)
            }); 
            this.expServ.csvDownload(';;Liste Receptions',dateToExport,'reception');
            break;
      case 'detailsReception':
                      
            this.expServ.csvDownload(';;Liste Details Reception',this.exportdata,'detailsReception');
            break;    
      case 'detailsCommande':
               
            this.expServ.csvDownload(';;Liste Details Commande',this.exportdata[0]['postes'],'detailsCommande');
            break;   
      case 'listeCommandes':

        let ligne: {
          ncommande:string,
          fournisseur:string,
          libelle_four:string,
          datecommande:string,
          nbpostes:string,
          nbpostes_termines:string,
          devise:string,
          
       }
        this.exportdata.forEach(function (value:any) {
          ligne = {
            ncommande: value.ncommande,
            fournisseur: value.fournisseur,
            libelle_four: value.libelle_four,
            datecommande: value.datecommande,
            nbpostes: value.nbpostes,
            nbpostes_termines: value.nbpostes_termine,
            devise: value.devise,
            
        };
          
          dToExport.push(ligne)
        }); 
              
            this.expServ.csvDownload(';;Liste Des Commandes d\'achat',dToExport,'listeCommandes');
            break;  
            
      case 'reception-article':
               
            this.expServ.csvDownload(';;Liste Receptions Par Article',this.exportdata,'receptionarticle');
            break;    
            
      case 'en-dm':
               
            this.expServ.csvDownload(';;;;;;Liste DM EN',this.exportdata,'en-dm');
            break;  
      case 'hn-dm':
               
            this.expServ.csvDownload(';;;;;;Liste DM HN',this.exportdata,'hn-dm');
            break;            
  }
   
  }


  pdfDownload(){
     
    
    let doc = new jsPDF('l','px','a4');
    let nb_page = 1;
    let ncde = ''
    let previousCde = ''
    let total_pages_par_dm:any;
    let arr_pages_dm = [];
    let mag:any;
    let ndmGroups:any;
    let currentPage = 1;
    let date = this.dateTreated;
    var img = new Image();
    img.src = '../../assets/images/cpg.png';

    if(this.datasource.length == 0){// if we don't have data to print in pdf

      this.confirmDialog()

    }else{

    switch (this.documentPdf){
      case 'bon-rec':


      let arr_total_pages = this.calculerNbPages();
      this.datasource.forEach(function(elt:any){

           ncde = elt['ncommande']
           if (ncde != previousCde){
             nb_page = 1;
             previousCde = ncde 
           }
         
       
         let arr_details_total = new Array()
   
         let tot_val_dinar = 0;
         let tot_val_dev = 0;

         elt['details'].forEach(function(et:any){

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
        
   
             arr_details_total.push([{content: `TOTAL RECEPTION :                                                                                                                                                                                 `+tot_val_dev.toFixed(3)+'        '+tot_val_dinar.toFixed(3), colSpan: 10, 
             styles: { fillColor: [239, 154, 154] }
             }])
                  //these variables to use in header of pages
                  let datereception = elt['datereception'];
                  let ncommande = elt['ncommande'];
                  let refreception = elt['refreception'];
                  let fourn = elt['fournisseur'];
                  let libelle = elt['libelle_four'];
                  let devise = elt['devise'];
                  let pconv = elt['details'][0]['pconv'];

                  if (ncde != previousCde){nb_page = 1;}

                  
                  let total_pages_par_cde = 0;

                  autoTable(doc, {
                     head: [['POSTE', 'STOCKCODE', 'ARTICLE','DESIGNATION','UNITE','QTE.R','PRIX UNIT','VAL EN DEV','VALEUR EN DT','MG']],
                     body: arr_details_total,
                     margin:{top:100,bottom:0},
                     rowPageBreak:'avoid',
                     didDrawPage:function(data){
                    
                      //this bloc is to get number of pages per command
                     for(let item of arr_total_pages){
                        if(item.cde === ncommande){
                          total_pages_par_cde = item.nbpage
                          break;
                        }
                     } 
                                        
                     doc.setFont('Times','bold')   
                     doc.setFontSize(14)    
                     doc.text('BON DE RECEPTION DU : '+datereception,doc.internal.pageSize.getWidth()/3, 20)                    
                     doc.setFont('Times','normal')
                     doc.setFontSize(12)
                     doc.text('REFERENCE FACTURE .....................',30,50)
                     doc.text('AUTRES REFERENCES .....................',250,50)
                     doc.text('PAGE: ',560,50)
                     doc.text(String(nb_page)+'/'+String(total_pages_par_cde),585,50)
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
            
      }) 
     
           //delete last empty page
          doc.deletePage(doc.getNumberOfPages());
          doc.save('report.pdf')
        
            break;

      case 'doc-rec':
                  
                 let arr_pages  = this.calculNbPagesDocReception(this.datasource)    

                 for(var i = 0;i<this.datasource.length;i++) { 
                
                  nb_page = 0; //reset nb pages every new command
                  let arr_details_total = new Array()
                  let postes = this.datasource[i]['postes'];
                 
                  for(var j = 0; j<postes.length;j++){

                
                        let arr_details = new Array()

                        arr_details.push(postes[j]['nposte'])
                        arr_details.push(postes[j]['mnemref'] +'\n'+ postes[j]['designation'])
                        arr_details.push(postes[j]['unite_sortie'] +'/'+ postes[j]['unite_achat']+'\n'+postes[j]['conv_facteur'])
                        arr_details.push(postes[j]['qte_a_recevoir']+'   ............')
                              
                        
                        arr_details_total.push(arr_details)
            
              
           
                  }
                 
                 let ncommande = this.datasource[i]['ncommande'];
                 let four = this.datasource[i]['fournisseur'];
                 let libelle = this.datasource[i]['libelle_four'];
                 let currentdate =this.gserv.formatDateBySlash(new Date());
                 let total_pages_par_cde:number = 0;
                 autoTable(doc, {
                     head: [['POSTE', 'NOMENCLATURE / REF'+'\n'+'DESIGNATION', 'UDA/UDS'+'\n'+'FACTEUR CONVERS','QUANTITE ATTENDUE'+'\n'+'....RECUE....','OBSERVATION']],
                     body: arr_details_total,
                     margin:{top:100,bottom:0},
                     headStyles: {halign:'center'},
                     bodyStyles:{halign:'center'},
                     rowPageBreak:'avoid',
                     didDrawPage:function(data){
                  
                      nb_page++
                    
                     for(let item of arr_pages){
                          if(item.cde === ncommande){
                            total_pages_par_cde = item.nbpage;
                            break;
                          }
                      } 
                    
                      doc.setFont('Times','bold')   
                      doc.setFontSize(14)    
                      doc.text('DOCUMENT DE RECEPTION ',doc.internal.pageSize.getWidth()/3, 20)
                     
                      doc.setFont('Times','normal')
                      doc.setFontSize(12)
                      doc.text('REFERENCE FACTURE .....................',30,50)
                      doc.text('AUTRES REFERENCES .....................',250,50)
                      doc.text('PAGE: ',560,50)
                      doc.text(String(nb_page)+'/'+String(total_pages_par_cde),585,50)
                      doc.text('Numéro : ....................',30,60)
                      doc.text('Bon de Livraison : ....................',250,60)
                      doc.text('Date : ....................',30,70)
                      doc.text('Fiche de Transit : ....................',250,70)
                      doc.text('N°  : ....................',400,70)
                      doc.setFont('Times','bold') 
                      doc.text('DATE : ',30,90)
                      doc.setFont('Times','normal') 
                      doc.text(currentdate,65,90)
                      doc.setFont('Times','bold') 
                      doc.text('N°COMMANDE :',140,90)
                      doc.setFont('Times','normal') 
                      doc.text(ncommande,215,90)
                      doc.setFont('Times','bold') 
                      doc.text('CODE FOURNISSEUR & NOM : ',250,90)
                      doc.setFont('Times','normal') 
                      doc.text(four+' '+libelle,385,90)
                      
                     }

                   
                   })
                   
                   doc.addPage();        
         
           
      }
           //delete last empty page
          doc.deletePage(doc.getNumberOfPages());
          doc.save('report.pdf')
        
            
            break;  

        case 'hn-dm':
                        
                        total_pages_par_dm = 0;
                        arr_pages_dm = this.calculNbPagesDm(this.datasource,'ndm');
                        mag = '';
                        // Loop through the array and group the items by ndm
                        ndmGroups = this.groupBy(this.datasource, 'ndm');
                        
                        // Loop through the ndm groups and create a table for each group
                        currentPage = 1;
                        Object.keys(ndmGroups).forEach((ndm, index) => {
                          nb_page = 0;
                          let livraisonTotal = 0
                          // Create the table header
                          const tableHeader = ['N° ORDRE', 'MNEMONIC', 'REFERENCE', 'QUANTITE', 'UNITE', 'DESIGNATION', 'LIVRAISON'];

                          // Create the table data
                          const tableData = ndmGroups[ndm].map(item => {
                            return [item.nordre, item.mnemonic, item.reference, item.quantite, item.unite, item.designation, item.total];
                          });

                          //calculate total livraison by ndm
                          tableData.forEach(function(row){
                            livraisonTotal = livraisonTotal + row[6]
                          })
                         // get magasin
                          mag = ndmGroups[ndm][0].mag
                          tableData.push([{content: `VALEUR TOTAL :                                                                                                                                                                                                                          `+livraisonTotal, colSpan: 10, 
                          styles: { fillColor: [239, 154, 154] }
                          }])
                          const options: MyOptions = {
                            head:[tableHeader], 
                            body:tableData, 
                            startY: 60,
                            margin: { top: 60, bottom: 60 },
                          
                            didDrawPage(data) {

                              nb_page++;
                              for(let item of arr_pages_dm){
                                if(item.cde === ndm){
                                  total_pages_par_dm = item.nbpage;
                                  break;
                                }
                            } 
                            doc.addImage(img, 'png', 22, -5, 50, 50);  
                            doc.setFont('Times','bold')   
                            doc.setFontSize(14)    
                            doc.text('DEMANDE DE MATERIEL (EX-HN)',doc.internal.pageSize.getWidth()/3, 20)
                           
                            doc.setFont('Times','normal')
                            doc.setFontSize(12)
                            doc.text('NUMERO DM (HN) : ',30,50)
                            doc.text(ndm,130,50)
                            doc.text('MAGASIN : ',200,50)
                            doc.text(mag,250,50)
                            doc.text('DATE : ',330,50)
                            doc.text(date,370,50)
                            doc.text('PAGE: ',560,50)
                            doc.text(String(nb_page)+'/'+String(total_pages_par_dm),585,50)


                           //Draw footer
                            doc.setLineWidth(0.5);
                            doc.setDrawColor(0, 0, 0);

                            // Draw a horizontal line
                            doc.line(30, doc.internal.pageSize.getHeight() - 50, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 50);  
                            doc.text('CHEF APPRO',32,doc.internal.pageSize.getHeight() - 42),  
                            doc.line(150, doc.internal.pageSize.getHeight() - 50, 150, doc.internal.pageSize.getHeight() - 20);
                            doc.text('REPRISE :                  N°'+'\n'+'DU :                DE :',152,doc.internal.pageSize.getHeight() - 42), 
                            doc.line(320, doc.internal.pageSize.getHeight() - 50, 320, doc.internal.pageSize.getHeight() - 20);
                            doc.text('OBSERVATIONS',322,doc.internal.pageSize.getHeight() - 42), 
                            doc.line(500, doc.internal.pageSize.getHeight() - 50, 500, doc.internal.pageSize.getHeight() - 20); 
                            doc.text('CHEF DGS',502,doc.internal.pageSize.getHeight() - 42), 
                            doc.line(30, doc.internal.pageSize.getHeight() - 50, 30, doc.internal.pageSize.getHeight() - 20);      
                            doc.line(30, doc.internal.pageSize.getHeight() - 20, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 20);   
                            doc.line(doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 50, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 20);                                
                            }
                          };
                        
                    
                          // Add a row at the bottom of the table
                          autoTable(doc, options);
     
                          doc.addPage();
                        });

                        
                         //delete last empty page
                        doc.deletePage(doc.getNumberOfPages());
                        doc.save('DM.pdf')
        
                            
            break;  
          
        
        case 'en-dm':
                             
                      
                      total_pages_par_dm = 0;
                      arr_pages_dm = this.calculNbPagesDm(this.datasource,'chapitre');
                     
                      //doc = new jsPDF('p','px','a4');
                      // Loop through the array and group the items by ndm
                      ndmGroups = this.groupBy(this.datasource, 'chapitre');
                      
                      // Loop through the ndm groups and create a table for each group
                      currentPage = 1;
                      Object.keys(ndmGroups).forEach((chapitre, index) => {
                        nb_page = 0;
                        let livraisonTotal = 0
                        // Create the table header
                        const tableHeader = ['N° ORDRE', 'NOMENCLATURE', 'QUANTITE', 'UNITE', 'DESIGNATION', 'LIVRAISON'];

                        // Create the table data
                        const tableData = ndmGroups[chapitre].map(item => {
                          return [item.nordre, item.nomenclature, item.quantite, item.unite, item.designation, item.total];
                        });

                        //calculate total livraison by ndm
                        tableData.forEach(function(row){
                          livraisonTotal = livraisonTotal + row[5]
                        })
                      // get magasin
                        mag = ndmGroups[chapitre][0].mag
                        tableData.push([{content: `TOTAL CHAP/SCHAP :                                                                                                                                                                                                                    `+livraisonTotal, colSpan: 10, 
                        styles: { fillColor: [239, 154, 154] }
                        }])
                        const options: MyOptions = {
                          head:[tableHeader], 
                          body:tableData, 
                          startY: 60,
                          margin: { top: 60, bottom: 60 },
                        
                          didDrawPage(data) {

                            nb_page++;

                            for(let item of arr_pages_dm){
                              if(item.cde === chapitre){
                                total_pages_par_dm = item.nbpage;
                                break;
                              }
                          } 
                          doc.addImage(img, 'png', 22, -5, 50, 50); 
                          doc.setFont('Times','bold')   
                          doc.setFontSize(14)    
                          doc.text('DEMANDE DE MATERIEL EN',doc.internal.pageSize.getWidth()/3, 20)
                        
                          doc.setFont('Times','normal')
                          doc.setFontSize(12)
                          doc.text('CHAP/SCHAP : ',30,50)
                          doc.text(chapitre,100,50)
                          doc.text('DATE : ',330,50)
                          doc.text(date,370,50)
                          doc.text('PAGE: ',560,50)
                          doc.text(String(nb_page)+'/'+String(total_pages_par_dm),585,50)



                        //Draw footer
                          doc.setLineWidth(0.5);
                          doc.setDrawColor(0, 0, 0);

                        
                          doc.line(30, doc.internal.pageSize.getHeight() - 50, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 50);  
                          doc.text('CHEF APPRO',32,doc.internal.pageSize.getHeight() - 42),  
                          doc.line(150, doc.internal.pageSize.getHeight() - 50, 150, doc.internal.pageSize.getHeight() - 20);
                          doc.text('REPRISE :                  N°'+'\n'+'DU :                DE :',152,doc.internal.pageSize.getHeight() - 42), 
                          doc.line(320, doc.internal.pageSize.getHeight() - 50, 320, doc.internal.pageSize.getHeight() - 20);
                          doc.text('OBSERVATIONS',322,doc.internal.pageSize.getHeight() - 42), 
                          doc.line(500, doc.internal.pageSize.getHeight() - 50, 500, doc.internal.pageSize.getHeight() - 20); 
                          doc.text('CHEF DGS',502,doc.internal.pageSize.getHeight() - 42), 
                          doc.line(30, doc.internal.pageSize.getHeight() - 50, 30, doc.internal.pageSize.getHeight() - 20);      
                          doc.line(30, doc.internal.pageSize.getHeight() - 20, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 20);   
                          doc.line(doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 50, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 20);                                
                          }
                        };
                      
                  
                        // Add a row at the bottom of the table
                        autoTable(doc, options);

                        doc.addPage();
                      });

                      
                      //delete last empty page
                      doc.deletePage(doc.getNumberOfPages());
                      doc.save('DM.pdf')


            break;    
  }

}
     
  }

 groupBy(array, property) {
  return array.reduce((acc, obj) => {
    
    const key = property ? obj[property] : obj;
    
    if (!acc[key]) {
      acc[key] = [];
    }
    
    acc[key].push(obj);
    
    return acc;
  }, {});
}

 
  calculerNbPages(){

     let doc = new jsPDF('l','px','a4');
 
     let arr_cde_nb_pages = new Array<Cde_nbpageInterface>();
 
                this.datasource.forEach(function(elt:any){    
         
           
                          let arr_details_total = new Array()

                          let tot_val_dinar = 0;
                          let tot_val_dev = 0;
                    
               
                          elt['details'].forEach(function(det:any){

                                          let arr_details = new Array()
                                          arr_details.push(det['poste'])
                                          arr_details.push(det['stockcode'])
                                          arr_details.push(det['mnemref'])
                                          arr_details.push(det['designation'])
                                          arr_details.push(det['unite'])
                                          arr_details.push(det['qterecu'])
                                          arr_details.push(det['prixdev'])
                                          arr_details.push(det['valendevise'])
                                          arr_details.push(det['valendinar'])   
                                          arr_details.push(det['magasin'])
                                          
                                          arr_details_total.push(arr_details)
                
                                          tot_val_dinar = tot_val_dinar + det['valendinar'];
                                          tot_val_dev = tot_val_dev + det['valendevise'];
                          })
                      

                   
                    

                        arr_details_total.push([{content: `TOTAL RECEPTION :                                                                                                            `+tot_val_dev+'        '+tot_val_dinar, colSpan: 10, 
                        styles: { fillColor: [239, 154, 154] }
                        }])
                          

                            autoTable(doc, {
                                head: [['POSTE', 'STOCKCODE', 'ARTICLE','DESIGNATION','UNITE','QTE.R','PRIX UNIT','VAL EN DEV','VALEUR EN DT','MG']],
                                body: arr_details_total,
                                margin:{top:100,bottom:0},
                                rowPageBreak:'avoid',
                                didDrawPage:function(data){
                                  
                                  console.log(doc.getNumberOfPages())                                
                                  let flag_cde_notfound = true;     
                                  for(let el of arr_cde_nb_pages){
                       
                                    if(el.cde === elt['ncommande']){
                                      el.nbpage = el.nbpage + 1
                                      flag_cde_notfound = false
                                    }else continue
                       
                                  }
                       
                                  if (flag_cde_notfound){
                                  let x = {
                                      "cde":elt['ncommande'],
                                      "nbpage": 1
                                    }
                       
                                    arr_cde_nb_pages.push(x)
                                  }
                              }
                              
                              })
                              doc.addPage();
                    
                           
            })

          
            return arr_cde_nb_pages;
  }


calculNbPagesDocReception(datasource:any){

  let doc = new jsPDF('l','px','a4');
 
  let arr_cde_nb_pages = new Array<Cde_nbpageInterface>();
 
  let gserve = this.gserv;



  datasource.forEach(function(elt:any){

      
         
    let arr_details_total = new Array()
    let postes =elt['postes'];
    

     postes.forEach(function(et:any){

              let arr_details = new Array()

              arr_details.push(et['nposte'])
              arr_details.push(et['mnemref'] +'\n'+ et['designation'])
              arr_details.push(et['unite_sortie'] +'/'+ et['unite_achat']+'\n'+et['conv_facteur'])
              arr_details.push(et['qte_a_recevoir']+'   ............')
                    
              
              arr_details_total.push(arr_details)
  
    
            })
            

      
     
     let ncommande = elt['ncommande'];
     let four = elt['fournisseur'];
     let libelle = elt['libelle_four'];
     let currentdate = gserve.formatDateBySlash(new Date());
     
     autoTable(doc, {
         head: [['POSTE', 'NOMENCLATURE / REF'+'\n'+'DESIGNATION', 'UDA/UDS'+'\n'+'FACTEUR CONVERS','QUANTITE ATTENDUE'+'\n'+'....RECUE....','OBSERVATION']],
         body: arr_details_total,
         margin:{top:100,bottom:0},
         headStyles: {halign:'center'},
         bodyStyles:{halign:'center'},
         rowPageBreak:'avoid',
         didDrawPage:function(data){
             
           // bloc add nbpages to cde every array of command will be added to nb pages of this command   
           let flag_cde_notfound = true;     
           for(let el of arr_cde_nb_pages){

             if(el.cde === elt['ncommande']){
               el.nbpage = el.nbpage + 1
               flag_cde_notfound = false
             }else continue

           }

           if (flag_cde_notfound){
           let x = {
               "cde":elt['ncommande'],
               "nbpage": 1
             }

             arr_cde_nb_pages.push(x)
           }
          
          doc.setFont('Times','bold')   
          doc.setFontSize(14)    
          doc.text('DOCUMENT DE RECEPTION ',doc.internal.pageSize.getWidth()/3, 20)
         
          doc.setFont('Times','normal')
          doc.setFontSize(12)
          doc.text('REFERENCE FACTURE .....................',30,50)
          doc.text('AUTRES REFERENCES .....................',250,50)
          doc.text('PAGE: ',560,50)
          doc.text(''+'/'+'',585,50)
          doc.text('Numéro : ....................',30,60)
          doc.text('Bon de Livraison : ....................',250,60)
          doc.text('Date : ....................',30,70)
          doc.text('Fiche de Transit : ....................',250,70)
          doc.text('N°  : ....................',400,70)
          doc.setFont('Times','bold') 
          doc.text('DATE : ',30,90)
          doc.setFont('Times','normal') 
          doc.text(currentdate,65,90)
          doc.setFont('Times','bold') 
          doc.text('N°COMMANDE :',140,90)
          doc.setFont('Times','normal') 
          doc.text(ncommande,215,90)
          doc.setFont('Times','bold') 
          doc.text('CODE FOURNISSEUR & NOM : ',250,90)
          doc.setFont('Times','normal') 
          doc.text(four+' '+libelle,385,90)
          
         }

       
       })
             doc.addPage();  
    
            
             
     
       })       
    
                              
        
 
       return arr_cde_nb_pages;
}




calculNbPagesDm(datasource:any,col:string){

     let arr_cde_nb_pages = new Array<Cde_nbpageInterface>();
     let doc = new jsPDF('l','px','a4');
     // Loop through the array and group the items by ndm
     const ndmGroups = this.groupBy(this.datasource, col);
   
     // Loop through the ndm groups and create a table for each group
     let currentPage = 1;
     Object.keys(ndmGroups).forEach((ndm, index) => {
 
       let livraisonTotal = 0
       // Create the table header
       const tableHeader = ['N° ORDRE', 'MNEMONIC', 'REFERENCE', 'QUANTITE', 'UNITE', 'DESIGNATION', 'LIVRAISON'];
 
       // Create the table data
       const tableData = ndmGroups[ndm].map(item => {
         return [item.nordre, item.mnemonic, item.reference, item.quantite, item.unite, item.designation, item.total];
       });
 
       //calculate total livraison by ndm
       tableData.forEach(function(row){
         livraisonTotal = livraisonTotal + row[6]
       })
     
       // Calculate the total number of pages for this ndm
       const totalPages = Math.ceil(tableData.length / 28);
       
       tableData.push([{content: `VALEUR TOTAL :                                                                                                                                                                                                                          `+livraisonTotal, colSpan: 10, 
       styles: { fillColor: [239, 154, 154] }
       }])
       const options: MyOptions = {
         head:[tableHeader], 
         body:tableData, 
         startY: 60,
         margin: { top: 60, bottom: 60 },
        
         didDrawPage(data) {
           // Add the table to the document
           doc.text(`NDM: ${ndm}`, 20, 30);
                                      
           let flag_cde_notfound = true;     
           for(let el of arr_cde_nb_pages){

             if(el.cde === ndm){
               el.nbpage = el.nbpage + 1
               flag_cde_notfound = false
             }else continue

           }

           if (flag_cde_notfound){
           let x = {
               "cde":ndm,
               "nbpage": 1
             }

             arr_cde_nb_pages.push(x)
           }
       
         }
       };
     
  
       // Add a row at the bottom of the table
       autoTable(doc, options);
     
       doc.addPage();
     });

     return arr_cde_nb_pages;
}




  confirmDialog(): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      //this.result = dialogResult;
    });
}
}