import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUtilisateur } from '../dossier';
import { utilisateurListService } from '../dossier-admin.service';

@Component({
  selector: 'app-dossier-detail',
  templateUrl: './dossier-detail.component.html',
  styleUrls: ['./dossier-detail.component.css']
})
export class DossierDetailComponent implements OnInit {

  public utilisateur: IUtilisateur = <IUtilisateur>{};

  constructor(
    private route: ActivatedRoute,

    private utilisateurService: utilisateurListService,

    private router: Router
  ) { }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');

    this.utilisateurService.getUtilisateurs().subscribe((utilisateurs: IUtilisateur[]) => {
      this.utilisateur = utilisateurs.find(utilisateur => utilisateur.Id == id);
      console.log('utilisateur: ', this.utilisateur)

    })

  }

  public backToList(): void{
    this.router.navigate(['/utilisateurs'])
  }

}
