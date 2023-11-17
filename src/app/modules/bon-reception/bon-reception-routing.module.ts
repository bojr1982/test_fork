import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionGridComponent } from 'src/app/modules/bon-reception/components/reception-grid/reception-grid.component';
const routes: Routes = [
  {path:'',component:ReceptionGridComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BonReceptionRoutingModule { }
