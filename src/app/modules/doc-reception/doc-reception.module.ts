import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocReceptionGridComponent } from './components/doc-reception-grid/doc-reception-grid.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ComponentsModule } from 'src/app/components/components.module';
import { CommandeFormComponent } from './components/commande-form/commande-form.component';
import { SetFontTdDirective } from './directives/set-font-td.directive';
import { SetPaddingTdDirective } from './directives/set-padding-td.directive';
import { SetPaddingDivDirective } from './directives/set-padding-div.directive';
import { DocReceptionGridV2Component } from './components/doc-reception-grid-v2/doc-reception-grid-v2.component';
import { PostesCommandeGridComponent } from './components/postes-commande-grid/postes-commande-grid.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatDialogModule } from '@angular/material/dialog';
import { GridCommandeComponent } from './components/grid-commande/grid-commande.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@NgModule({
    declarations: [
        DocReceptionGridComponent,
        CommandeFormComponent,
        SetFontTdDirective,
        SetPaddingTdDirective,
        SetPaddingDivDirective,
        DocReceptionGridV2Component,
        PostesCommandeGridComponent,
        GridCommandeComponent
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        DragDropModule,
        MatCheckboxModule,
        ScrollingModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatFormFieldModule 
    ]
})
export class DocReceptionModule { }
