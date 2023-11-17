import { Component, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { DocReceptionService } from 'src/app/modules/doc-reception/doc-reception.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent {


  @Output() commandeEvent:EventEmitter<string> = new EventEmitter()
  toppings = new FormControl('');
  commandList: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(private apiServ:DocReceptionService, private gserv:GlobalService, private dialog:MatDialog){
  
    this.filteredOptions = this.toppings.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
 

  ngOnInit() {
    
    this.apiServ.getListeCommandes().subscribe({
  
      next:(res)=>{

       this.commandList = res['data']
             
      },
      error:(err)=>{
        
      }
    })
  }

  enableButton(){

    if(this.toppings.value == '' )
    return true
    else return false
  }  
  submitValues(){
    
    this.apiServ.getSelectedCommandes(this.toppings.value).subscribe({
  
      next:(res)=>{

      
       this.commandeEvent.emit(res.data)
        
      },
      error:(err)=>{
        
      }
    })
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.commandList.filter(option => option.toLowerCase().includes(filterValue));
  }


 
}
