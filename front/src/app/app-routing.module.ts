import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './composants/connexion/connexion.component';
import { MotdepasseoublierComponent } from './composants/motdepasseoublier/motdepasseoublier.component';

const routes: Routes = [
  {path:'connexion',component:ConnexionComponent},
  {path:'oublier',component:MotdepasseoublierComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
