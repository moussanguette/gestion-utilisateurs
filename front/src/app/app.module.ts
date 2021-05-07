import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localefr from '@angular/common/locales/fr';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';



import { AppComponent } from './app.component';
import { DossierAdminComponent } from './admin/dossier-admin/dossier-admin.component';
/* import { from } from 'rxjs';*/
import { ReplaceComma } from './shared/pipes/replace-comma.pipe';
import { StarRatingComponent } from './shared/components/star-rating/star-rating.component';
import { HomeComponent } from './home/home.component';
import { DossierDetailComponent } from './admin/dossier-detail/dossier-detail.component';
import { AdminModule } from './admins/admin.module';

registerLocaleData(localefr, 'fr');

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent
    

  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      /* { path: 'home', component :HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }, */
      /* ,
      { path: '**', redirectTo: 'home', pathMatch: 'full' } */
    ]),
    AdminModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
