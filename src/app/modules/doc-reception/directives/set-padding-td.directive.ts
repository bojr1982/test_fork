import { Directive, ElementRef, HostBinding, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSetPaddingTd]'
})
export class SetPaddingTdDirective {

  constructor(private element:ElementRef, private renderer:Renderer2) { }


  paddingR:string = '20px'

  
  @HostBinding('style.padding-Right') setpadding = this.paddingR


}
