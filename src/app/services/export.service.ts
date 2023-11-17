import { Injectable } from '@angular/core';
import { ngxCsv } from 'ngx-csv';
import { Lib_commandeInterface } from '../interfaces/lib_commande.interface';
import { Lib_details_commandeInterface } from '../interfaces/lib_details_commande.interface';
import { Lib_details_receptionInterface } from '../interfaces/lib_details_reception.interface';
import { Lib_receptionInterface } from '../interfaces/lib_reception.interface';
@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  lib_r:Lib_receptionInterface = {ncommande:'N° COMMANDE',refreception:'REF RECEPTION',fournisseur:'FOURNISSEUR',libelle_four:'LIBELLE',devise:'DEVISE',datereception:'DATE RECEPTION'}
  lib_dr:Lib_details_receptionInterface = {ncommande:'N° COMMANDE',refreception:'REF RECEPTION',poste:'POSTE',stockcode:'STOCKCODE',mnemref:'ARTICLE',designation:'DESIGNATION',unite:'UNITE',qterecu:'QTE.R',prixdev:'PRIX UNIT',valendevise:'VALENDEVISE',valendinar:'VALENDINAR',magasin:'MAGASIN',conv:'CONV'}
  lib_dc:Lib_details_commandeInterface = {ncommande:'N° COMMANDE',nposte:'N° POSTE',unite_sortie:'UNITE SORTIE',unite_achat:'UNITE ACHAT',conv_facteur:'FACTEUR CONVERSTION',qte_a_recevoir:'QTE A RECEVOIR',mnemref:'MNEMONIC/REFERENCE',designation:'DESIGNATION'}
  lib_c:Lib_commandeInterface = {ncommande:'N° COMMANDE',fournisseur:'FOURNISSEUR',libel_four:' LIBELLE FOURN',datecommande:'DATE COMMANDE',devise:'DEVISE',nbpostes:'NB POSTES',nbpostes_termines:'NB POSTES TERMINES'}
  
  
  head_reception = [this.lib_r.ncommande, this.lib_r.refreception,this.lib_r.fournisseur,this.lib_r.libelle_four,this.lib_r.devise, this.lib_r.datereception]
  head_details_reception = [this.lib_dr.poste,this.lib_dr.stockcode,this.lib_dr.mnemref,this.lib_dr.designation,this.lib_dr.unite,this.lib_dr.qterecu,this.lib_dr.prixdev,this.lib_dr.valendevise,this.lib_dr.valendinar,this.lib_dr.magasin,this.lib_dr.refreception,this.lib_dr.ncommande,this.lib_dr.conv] 
  head_details_commande = [this.lib_dc.ncommande,this.lib_dc.nposte,this.lib_dc.unite_sortie,this.lib_dc.unite_achat,this.lib_dc.conv_facteur,this.lib_dc.qte_a_recevoir,this.lib_dc.mnemref,this.lib_dc.designation]
  head_commande = [this.lib_c.ncommande,this.lib_c.fournisseur,this.lib_c.libel_four,this.lib_c.datecommande,this.lib_c.nbpostes,this.lib_c.nbpostes_termines,this.lib_c.devise]
  head_reception_article = ['STOCK CODE','N° Reception','DATE RECEPTION','N° Commande','DATE COMMANDE','QTE RECU','QTE COMMANDE ','PRIX DEVISE','PRIX MLT']
  head_dm_en = ['CHAPITRE','N° ORDRE','NOMENCLATURE','DESIGNATION 1','DESIGNATION 2','DESIGNATION 3','DESIGNATION 4','UNITE','QUANTITE','LIVRAISON','TOTAL']
  head_dm_hn = ['N° DM','MAGASIN','N° ORDRE','MNEMONIC','REFERENCE','DESIGNATION 1','DESIGNATION 2','DESIGNATION 3','DESIGNATION 4','UNITE','QUANTITE','LIVRAISON','TOTAL']





  csvDownload(title:any,data:any,componentToExport:any){
 
    let head :any;
     switch (componentToExport){
      case 'reception':
            head = this.head_reception
            break;
      case 'detailsReception':
            head = this.head_details_reception          
           
            break;    
      case 'detailsCommande':
            head = this.head_details_commande
            break;    
              
      case 'listeCommandes':
            head = this.head_commande
            break;   
            
      case 'receptionarticle':
            head = this.head_reception_article
            break;   
      case 'en-dm':
            head = this.head_dm_en
            break;    
                  
      case 'hn-dm':
            head = this.head_dm_hn
            break;               
  }
    var options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: ',,',
      showLabels: true,
      showTitle: true,
      title: title,
      useBom: true,
      noDownload: false,
      headers: head
    };

    new ngxCsv(data, "Report", options);

    }


}
