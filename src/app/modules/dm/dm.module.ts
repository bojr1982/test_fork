import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { HnComponent } from './components/hn/hn.component';
import { EnComponent } from './components/en/en.component';
import { DateComponentComponent } from './date-component/date-component.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EcranRechercheComponent } from './components/suivieDm/ecran-recherche/ecran-recherche.component';
import { MatSelectModule } from '@angular/material/select';
import { SelectInputMagComponent } from './components/select-input-mag/select-input-mag.component';


@NgModule({
  declarations: [
    HnComponent,
    EnComponent,
    DateComponentComponent,
    EcranRechercheComponent,
    SelectInputMagComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    DragDropModule,
    MatDialogModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class DmModule { }
