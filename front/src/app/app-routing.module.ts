import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { ConnexionComponent } from './composants/connexion/connexion.component';
import { InscriptionComponent } from './composants/inscription/inscription.component';
import { MotdepasseoublierComponent } from './composants/motdepasseoublier/motdepasseoublier.component';

const routes: Routes = [
  {path:'connexion',
  component: ConnexionComponent
},
  {path:'oublier',
  component:MotdepasseoublierComponent
},
{ path: 'inscription',
 component:InscriptionComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
