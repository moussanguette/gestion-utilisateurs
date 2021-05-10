import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnexionService } from '../../services/connexion.service';
import { IAdmin }  from './admin';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private connexionService:ConnexionService, private route: ActivatedRoute) { }
  public admins: any[] = [
    {
      nom: "ASSANE",
      prenom: "THIAW",
      rol: "admin"
   },
   {
       nom: "MOUSSA",
       prenom: "NGETT",
       rol: "ETUDIANT"
    },
    {
       nom: "MOUHAMED",
       prenom: "NIANG",
       rol: "FINANCE"
    },
    {
       nom: "DIEGUI",
       prenom: "KA",
       rol: "ETUDIANTE"
    }
  
  ];
  private _adminFilter = 'Utilisateurs';
  public filteredadmins: IAdmin[] = [];

  dataId : object
  user:any
  nom :any
  prenom :any
  adresse :any
  age :any
  username :any
  role :any
  isAdmin :any
  ngOnInit(): void {
    this.filteredadmins = this.admins;

   const id = this.route.snapshot.params['id'];
   this.dataId={value:id}
    console.log(this.dataId)
    this.connexionService.recevoir(this.dataId).subscribe((resultat:any)=>{
      console.log(resultat.data)
      this.user=resultat.data
      this.nom=this.user.nom
      this.prenom=this.user.prenom
      this.adresse=this.user.adresse
      this.username=this.user.username
      this.role=this.user.role
    })
}

public get adminFilter(): string {
  return this._adminFilter;
}

public set adminFilter(filter: string) {
  this._adminFilter = filter;
  this.filteredadmins = this.adminFilter ? this.filteradmins(this.adminFilter): this.admins ; 

}


private filteradmins( criteria: string): IAdmin[] {
  criteria = criteria.toLocaleLowerCase();

  const res = this.admins.filter(
        (admin: IAdmin) =>  admin.nom.toLocaleLowerCase().indexOf(criteria) != -1
  );
  return res;
}
}
