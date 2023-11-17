import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DateInputComponent} from "./date-input/date-input.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTooltipModule} from "@angular/material/tooltip";
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ToolbarGridComponent } from './toolbar-grid/toolbar-grid.component';
import { PdfComponent } from './pdf/pdf.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TextInputComponent } from './text-input/text-input.component';
import { SelectInputComponent } from './select-input/select-input.component';
import {MatSelectModule} from '@angular/material/select';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ErrorComponent } from './error/error.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    DateInputComponent,
    ToolbarGridComponent,
    PdfComponent,
    TextInputComponent,
    SelectInputComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatNativeDateModule,
    MatDialogModule,
    DragDropModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule
  ],
  exports: [
    DateInputComponent,
    ToolbarGridComponent,
    TextInputComponent,
    SelectInputComponent
  ],
  providers: [
  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
]
})
export class ComponentsModule { }
