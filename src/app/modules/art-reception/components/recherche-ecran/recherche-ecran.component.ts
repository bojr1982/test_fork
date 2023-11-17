import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRechContentComponent } from '../dialog-rech-content/dialog-rech-content.component';

@Component({
  selector: 'app-recherche-ecran',
  templateUrl: './recherche-ecran.component.html',
  styleUrls: ['./recherche-ecran.component.scss']
})
export class RechercheEcranComponent implements OnInit{

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log("oninit")
    this.openDialog()
  }

 
  openDialog() {
    const dialogRef = this.dialog.open(DialogRechContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


