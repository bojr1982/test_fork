import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { CanDeactivateService } from './guards/can-deactivate.service';
import { DmGuardService } from './guards/dm-guard.service';
import { ReceptionGuardService } from './guards/reception-guard.service';
import { ReceptionParArticleComponent } from './modules/art-reception/components/reception-par-article/reception-par-article.component';
import { ReceptionGridComponent } from './modules/bon-reception/components/reception-grid/reception-grid.component';
import { EnComponent } from './modules/dm/components/en/en.component';
import { HnComponent } from './modules/dm/components/hn/hn.component';
import { EcranRechercheComponent } from './modules/dm/components/suivieDm/ecran-recherche/ecran-recherche.component';
import { DocReceptionGridV2Component } from './modules/doc-reception/components/doc-reception-grid-v2/doc-reception-grid-v2.component';
import { ContainerComponent } from './modules/layout-user/components/container/container.component';
import { UserLayoutComponent } from './modules/layout-user/user-layout.component';
import { LoginComponent } from './modules/login/components/login/login.component';
import { PredictComponent } from './modules/phosphates/components/predict/predict.component';

const routes: Routes = [

  { path:'', component:LoginComponent },

  { path:'',component:UserLayoutComponent,children:[
    {
      path:'bon-rec',component:ReceptionGridComponent, canActivate: [ReceptionGuardService]
    },
    {
      path:'doc-rec',component:DocReceptionGridV2Component, canActivate: [ReceptionGuardService]
    },
    {
      path:'rec-par-article',component:ReceptionParArticleComponent, canActivate: [ReceptionGuardService]
    },
    {
       path:'dm',canActivateChild: [DmGuardService],children:[

       { path:'en',component:EnComponent },
       { path:'hn',component:HnComponent },
       { path:'suivie',component:EcranRechercheComponent },

      ]
    },
    
   
  //  { path:'analyse',canDeactivate: [CanDeactivateService], component: PredictComponent},
  ]
 
  },

  {path:'**', component:ErrorComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
