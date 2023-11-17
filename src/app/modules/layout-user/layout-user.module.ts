import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { UserLayoutComponent } from './user-layout.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ComponentsModule } from 'src/app/components/components.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BonReceptionModule } from '../bon-reception/bon-reception.module';
import { ContainerComponent } from './components/container/container.component';
import { FooterComponent } from './components/footer/footer.component';
import { DocReceptionModule } from '../doc-reception/doc-reception.module';
import { FormsModule } from '@angular/forms';
import { ArtReceptionModule } from '../art-reception/art-reception.module';
import { MatMenuModule } from '@angular/material/menu';
import { DmModule } from '../dm/dm.module';
import { PhosphatesModule } from '../phosphates/phosphates.module';


@NgModule({
  declarations: [
    
    UserLayoutComponent,
    NavComponent,
    ContainerComponent,
    FooterComponent,
  
  
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    ComponentsModule,
    BonReceptionModule,
    DocReceptionModule,
    ArtReceptionModule,
    DmModule,
    FormsModule,
    MatMenuModule,
    PhosphatesModule
  ]
})
export class LayoutUserModule { }
