import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ArticleDetails } from 'src/app/models/ArticleDetails';

@Component({
  selector: 'app-details-article',
  templateUrl: './details-article.component.html',
  styleUrls: ['./details-article.component.scss']
})
export class DetailsArticleComponent implements OnInit{
  displayedColumns: string[] = ['stockcode', 'mnemref','designation', 'unite'];
  datasource:any;
  data:any;
  constructor(@Inject(MAT_DIALOG_DATA) data:any){
   
     this.data = data
  }
  ngOnInit() {
    
    this.datasource = new MatTableDataSource<ArticleDetails>(this.data); 
    

}

}
