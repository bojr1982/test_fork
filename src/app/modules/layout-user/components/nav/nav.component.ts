import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Emitters } from 'src/app/emitters/emitter';
import { DialogRechContentComponent } from 'src/app/modules/art-reception/components/dialog-rech-content/dialog-rech-content.component';

@Component({
  selector: '.app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  
  authenticated = false;
  source: string = "assets/images/cpg2.ico";
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

    
    Emitters.authEmitter.subscribe(
      (auth:boolean)=>{
        this.authenticated = auth;
      })
  }
  
  logout():void{

    Emitters.authEmitter.emit(false);

  }
  openDialog() {
   
    const config: MatDialogConfig = {
      panelClass: 'custom-dialog-container'
      
    };
    const dialogRef = this.dialog.open(DialogRechContentComponent,config);

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
