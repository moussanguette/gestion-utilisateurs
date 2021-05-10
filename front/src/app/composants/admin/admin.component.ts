import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnexionService } from '../../services/connexion.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private connexionService:ConnexionService, private route: ActivatedRoute) { }
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

}
