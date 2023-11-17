import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { DmService } from '../../dm.service';

@Component({
  selector: 'app-select-input-mag',
  templateUrl: './select-input-mag.component.html',
  styleUrls: ['./select-input-mag.component.scss']
})
export class SelectInputMagComponent {

  @Output() commandeEvent:EventEmitter<string> = new EventEmitter()
  toppings = new FormControl('');
  wharehouseList: string[] = [];

  constructor(private apiServ:DmService, private gserv:GlobalService){
  
  }
 

  ngOnInit() {
    
    this.apiServ.getListeMag().subscribe({
    
      next:(res)=>{
        let arr:string[] = []
        res['data'].forEach(m => {
          arr.push(m.magasin);
        });
       this. wharehouseList = arr
             
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
    
    // this.apiServ.getSelectedCommandes(this.toppings.value).subscribe({
  
    //   next:(res)=>{

      
    //    this.commandeEvent.emit(res.data)
        
    //   },
    //   error:(err)=>{
        
    //   }
    // })
}
}
