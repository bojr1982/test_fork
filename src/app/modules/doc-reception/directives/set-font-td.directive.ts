import { Directive, ElementRef, HostBinding, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSetFontTd]'
})
export class SetFontTdDirective {

  constructor(private element:ElementRef, private renderer:Renderer2) { }


  font:string='bold'
   
  @HostBinding('style.font-weight') setfont = this.font

}
