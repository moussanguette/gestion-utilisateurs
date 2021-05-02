import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './composants/admin/admin.component';
import { EtudiantComponent } from './composants/etudiant/etudiant.component';
import { FinaceComponent } from './composants/finace/finace.component';
import { FormateurComponent } from './composants/formateur/formateur.component';
import { FinanceComponent } from './composants/finance/finance.component';
import { ConnexionComponent } from './composants/connexion/connexion.component';
import { InscriptionComponent } from './composants/inscription/inscription.component';
import { DetailComponent } from './composants/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    EtudiantComponent,
    FinaceComponent,
    FormateurComponent,
    FinanceComponent,
    ConnexionComponent,
    InscriptionComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
