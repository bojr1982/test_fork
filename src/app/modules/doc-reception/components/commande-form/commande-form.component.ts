import { Component, OnInit, Inject  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Commande } from 'src/app/models/Commande'


@Component({
  selector: 'app-commande-form',
  templateUrl: './commande-form.component.html',
  styleUrls: ['./commande-form.component.scss']
})
export class CommandeFormComponent implements OnInit{

  reactiveForm:FormGroup;
  dataCommande:Commande;

  constructor( @Inject(MAT_DIALOG_DATA) dataCommande:any ){
    
      this.dataCommande = dataCommande;
    
  }
  ngOnInit(): void {

     this.reactiveForm = new FormGroup({
     ncommande : new FormControl(this.dataCommande['ncommande']),   //disabled:true
     fournisseur: new FormControl(this.dataCommande['fournisseur']),
     libelle_four: new FormControl(this.dataCommande['libelle_four']),
     datecommande: new FormControl(this.dataCommande['datecommande']),
     nbpostes: new FormControl(this.dataCommande['nbpostes']),
     nbpostes_termine: new FormControl(this.dataCommande['nbpostes_termine']),
     devise: new FormControl(this.dataCommande['devise']),

    })

  }

}
