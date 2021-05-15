import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './composants/admin/admin.component';
import { ConnexionComponent } from './composants/connexion/connexion.component';
import { InscriptionComponent } from './composants/inscription/inscription.component';
import { MotdepasseoublierComponent } from './composants/motdepasseoublier/motdepasseoublier.component';
import { UtilisateursComponent } from './composants/utilisateurs/utilisateurs.component';

const routes: Routes = [
  {path:'connexion',component:ConnexionComponent},
  {path:'oublier',component:MotdepasseoublierComponent},
  {path:'administrateur/:id',component:AdminComponent},
  {path:'inscription',component:InscriptionComponent},
  {path:'administrateur/utilisateur/:id',component:UtilisateursComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
