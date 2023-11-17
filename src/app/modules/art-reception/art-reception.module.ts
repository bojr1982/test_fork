import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogRechContentComponent } from './components/dialog-rech-content/dialog-rech-content.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReceptionParArticleComponent } from './components/reception-par-article/reception-par-article.component';
import { ArtReceptionService } from './art-reception.service';
import { ComponentsModule } from "../../components/components.module";
import { DetailsArticleComponent } from './components/details-article/details-article.component';



@NgModule({
    declarations: [
        DialogRechContentComponent,
        ReceptionParArticleComponent,
        DetailsArticleComponent
    ],
    providers: [ArtReceptionService],
    imports: [
        CommonModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        DragDropModule,
        MatCheckboxModule,
        ScrollingModule,
        MatInputModule,
        MatProgressBarModule,
        ComponentsModule
    ]
})
export class ArtReceptionModule { }
