import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './composants/admin/admin.component';
import { EtudiantComponent } from './composants/etudiant/etudiant.component';
import { FormateurComponent } from './composants/formateur/formateur.component';
import { FinanceComponent } from './composants/finance/finance.component';
import { ConnexionComponent } from './composants/connexion/connexion.component';
import { InscriptionComponent } from './composants/inscription/inscription.component';
import { DetailComponent } from './composants/detail/detail.component';
import { MotdepasseoublierComponent } from './composants/motdepasseoublier/motdepasseoublier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { UtilisateursComponent } from './composants/utilisateurs/utilisateurs.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    EtudiantComponent,
    FormateurComponent,
    FinanceComponent,
    ConnexionComponent,
    InscriptionComponent,
    DetailComponent,
    MotdepasseoublierComponent,
    UtilisateursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
