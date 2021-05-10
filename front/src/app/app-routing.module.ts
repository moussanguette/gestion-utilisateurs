import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './composants/admin/admin.component';
import { ConnexionComponent } from './composants/connexion/connexion.component';
import { MotdepasseoublierComponent } from './composants/motdepasseoublier/motdepasseoublier.component';

const routes: Routes = [
  {path:'connexion',component:ConnexionComponent},
  {path:'oublier',component:MotdepasseoublierComponent},
  {path:'administrateur/:id',component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
