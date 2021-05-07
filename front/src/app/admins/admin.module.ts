import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DossierAdminComponent } from '../admin/dossier-admin/dossier-admin.component';
import { DossierDetailComponent } from '../admin/dossier-detail/dossier-detail.component';
import { StarRatingComponent } from '../shared/components/star-rating/star-rating.component';
import { ReplaceComma } from '../shared/pipes/replace-comma.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DossierAdminComponent,
    DossierDetailComponent,
    StarRatingComponent,
    ReplaceComma
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      
      { path: 'utilisateurs/:id', component: DossierDetailComponent },
      { path: 'utilisateurs', component: DossierAdminComponent }
      
    ])
  ]
})
export class AdminModule { }
