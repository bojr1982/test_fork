import { style } from '@angular/animations';
import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSetmargin]'
})
export class SetmarginDirective implements OnInit{

  @Input()  marginR:string = '0px';
  constructor(private element:ElementRef, private renderer: Renderer2) { 

  }
  ngOnInit(): void {
   this.renderer.setStyle(this.element,'margin',this.marginR)
  }

@HostBinding('style.marginRight') marginRight = this.marginR 



}
