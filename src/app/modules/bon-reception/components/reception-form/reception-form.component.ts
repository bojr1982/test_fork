import { OnInit, Inject } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-reception-form',
  templateUrl: './reception-form.component.html',
  styleUrls: ['./reception-form.component.scss']
})
export class ReceptionFormComponent implements OnInit{

  reactiveForm:FormGroup;
  dataReception:any;

  constructor( @Inject(MAT_DIALOG_DATA) dataRecep:any,private ref:MatDialogRef<ReceptionFormComponent> ){
    
      this.dataReception = dataRecep;
    
  }
  ngOnInit(): void {

     this.reactiveForm = new FormGroup({
     ncommande : new FormControl(this.dataReception['ncommande']),   //disabled:true
     refreception: new FormControl(this.dataReception['refreception']),
     fournisseur: new FormControl(this.dataReception['fournisseur']),
     libelle_four: new FormControl(this.dataReception['libelle_four']),
     devise: new FormControl(this.dataReception['devise']),
     datereception: new FormControl(this.dataReception['datereception'])

    })

  }
  close(){
    
    this.ref.close()
  } 
}
