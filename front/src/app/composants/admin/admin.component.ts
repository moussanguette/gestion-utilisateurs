import { Component, OnInit } from '@angular/core'
import { IAdmin }  from './admin';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {



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


  constructor() { }

  ngOnInit(){
    this.filteredadmins = this.admins;
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
