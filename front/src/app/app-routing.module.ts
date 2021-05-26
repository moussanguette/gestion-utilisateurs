import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './composants/admin/admin.component';
import { ConnexionComponent } from './composants/connexion/connexion.component';
import { EtudiantComponent } from './composants/etudiant/etudiant.component';
import { FinanceComponent } from './composants/finance/finance.component';
import { FormateurComponent } from './composants/formateur/formateur.component';
import { InscriptionComponent } from './composants/inscription/inscription.component';
import { MotdepasseoublierComponent } from './composants/motdepasseoublier/motdepasseoublier.component';
import { UtilisateursComponent } from './composants/utilisateurs/utilisateurs.component';
import { UpdateUserComponent } from './composants/update-user/update-user.component';

//connexion google
import { from } from 'rxjs';


const routes: Routes = [
  {path:'',component:ConnexionComponent},
  {path:'oublier',component:MotdepasseoublierComponent},
  {path:'administrateur/:id',component:AdminComponent},
  {path:'etudiant/:id',component:EtudiantComponent},
  {path:'formateur/:id',component:FormateurComponent},
  {path:'finance/:id',component:FinanceComponent},
  {path:'administrateur/inscription/:id',component:InscriptionComponent},

  {path:'updateUser/:id',component:UpdateUserComponent},

  {path:'administrateur/utilisateur/:id',component:UtilisateursComponent},
  { path: '**', redirectTo: '' },
  {path:'utilisateur/:id',component:EtudiantComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
