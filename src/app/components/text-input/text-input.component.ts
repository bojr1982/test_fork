import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {

  @Output() commandeEvent:EventEmitter<string> = new EventEmitter()
  @ViewChild('button') btn:ElementRef;
  value:string = '';
  div_n = 'div-container'



  constructor() {}
  ngOnInit(): void {

  }


submitForm():void{


this.commandeEvent.emit(this.value)

  
   }

}

