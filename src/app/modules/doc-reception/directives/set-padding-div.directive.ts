import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSetPaddingDiv]'
})
export class SetPaddingDivDirective {

  constructor(private element:ElementRef, private renderer:Renderer2) { }
  
  background:string='transparent'

  @HostListener('mouseenter') onmouseover(){
    
   // this.renderer.addClass(this.element.nativeElement,'zoom')
    this.renderer.setStyle(this.element.nativeElement,'backgroundColor','#f77')
    this.renderer.setStyle(this.element.nativeElement,'margin','5px 10px')
    this.renderer.setStyle(this.element.nativeElement,'padding','30px 30px')
    this.renderer.setStyle(this.element.nativeElement,'transition','0.5s')

  }

  @HostListener('mouseleave') onmouseleave(){

    this.renderer.setStyle(this.element.nativeElement,'backgroundColor',this.background)
    this.renderer.setStyle(this.element.nativeElement,'margin','0px')
    this.renderer.setStyle(this.element.nativeElement,'padding','0px')
    this.renderer.setStyle(this.element.nativeElement,'transition','0.5s')

  }

}
