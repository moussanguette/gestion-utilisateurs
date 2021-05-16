import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from 'src/app/services/connexion.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {

  constructor(private connexionService:ConnexionService, private route:Router) { }
    data: any
    form : any
    status : any
    dataId : object
    user:any
    nom :any
    prenom :any
    adresse :any
    age :any
    username :any
    role :any
    isAdmin :any
    dataUser: any

  ngOnInit(): void {
    this.connexionService.recevoir(this.dataId).subscribe((resultat:any)=>{
      
      this.user=resultat.data
      console.log(this.user)
      this.nom=this.user.nom
      this.prenom=this.user.prenom
      this.adresse=this.user.adresse
      this.username=this.user.username
      this.role=this.user.role
    })

    this.connexionService.user().subscribe((resultat:any)=>{
      this.dataUser= resultat.users;
      
    })
  }


}
