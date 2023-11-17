import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonReceptionRoutingModule } from './bon-reception-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { ReceptionGridComponent } from './components/reception-grid/reception-grid.component';
import { DetailsReceptionGridComponent } from './components/details-reception-grid/details-reception-grid.component';
import { MatIconModule } from '@angular/material/icon';
import { ReceptionFormComponent } from './components/reception-form/reception-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    ReceptionGridComponent,
    DetailsReceptionGridComponent,
    ReceptionFormComponent
  ],
  imports: [

    CommonModule,
    BonReceptionRoutingModule,
    ComponentsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    DragDropModule,
    MatDialogModule
    
    
  ]
})
export class BonReceptionModule { }
