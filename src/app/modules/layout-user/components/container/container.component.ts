import { AfterContentChecked, AfterContentInit, Component, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements AfterContentInit, AfterContentChecked{
  

  
  @ContentChild('container') containerEl :ElementRef;

  ngAfterContentInit(): void {
   
  }

  ngAfterContentChecked(): void {
   
  }

  

}
