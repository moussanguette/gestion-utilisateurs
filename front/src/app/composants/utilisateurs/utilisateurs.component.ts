import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnexionService } from 'src/app/services/connexion.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  constructor( private connexionService:ConnexionService, private route: ActivatedRoute ) { }

nomUser:any
prenomUser:any
adresseUser:any
usernameUser:any
roleUser:any
mailUser:any
user:any
dataId:any

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.dataId={value:id}
    console.log("this.dataId")
    console.log(this.dataId)
    this.connexionService.recevoir(this.dataId).subscribe((resultat:any)=>{
      console.log("resultat.data")
      console.log(resultat.data)
      this.user=resultat.data
      this.nomUser=this.user.nom
      this.prenomUser=this.user.prenom
      this.adresseUser=this.user.adresse
      this.mailUser=this.user.email
      this.usernameUser=this.user.username
      this.roleUser=this.user.role
    }) 
    
  }

}
