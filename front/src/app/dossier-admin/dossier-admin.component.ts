import { Component, OnInit } from "@angular/core";
import { utilisateurListService } from "./dossier-admin.service";
import { IUtilisateur } from "./dossier"


@Component({
    selector: 'app-dossier-admin',
    templateUrl: './dossier-admin.component.html',
    styleUrls: ['./dossier-admin.component.css']
})

export class DossierAdminComponent implements OnInit {
      public title = 'liste utilisateurs';

      public utilisateurs: IUtilisateur[] = []
    
      public showBadge: boolean;

      private _utilisateurFilter = 'Utilisateur';

      public filteredUtilisateurs: IUtilisateur[] = [];

      public receivedRating: string;

      private errMsg: string;

      constructor (private utilisateurListService: utilisateurListService ){
        
      }

      ngOnInit() {
        this.utilisateurListService.getUtilisateurs().subscribe({
          next: utilisateurs => {
            this.utilisateurs = utilisateurs;
            this.filteredUtilisateurs = this.utilisateurs;
          },
          error: err => this.errMsg = err
        })
        this.utilisateurFilter = 'Utilisateurs'
      }
      public toggleIsNewBadge(): void{
        this.showBadge = !this.showBadge
      }
      public get utilisateurFilter(): string {
        return this._utilisateurFilter;
      }
      public set utilisateurFilter(filter: string) {
        this._utilisateurFilter = filter;

        this.filteredUtilisateurs = this.utilisateurFilter ? this.filterUtilisateurs(this.utilisateurFilter) : this.utilisateurs
      }
      public receiveRatingClicked(message: string): void{
        this.receivedRating = message;
      }

      private filterUtilisateurs(criteria: string): IUtilisateur[] {
        criteria = criteria.toLocaleLowerCase();

        const res = this.utilisateurs.filter(
          (utilisateur: IUtilisateur) => utilisateur.prenom.toLocaleLowerCase().indexOf(criteria) != -1
        );
        return res;
      }
}