import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnexionService } from '../../services/connexion.service';



@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styles: [
  ]
})
export class UpdateUserComponent implements OnInit {

  constructor(private connexionService:ConnexionService, private route:Router, private aRoute:ActivatedRoute) { }
    data: any
    form : any
    status : any
    dataId : object
    user:any
    nom :any
    prenom :any
    adresse :any
    tel :any
    username :any
    role :any
    isAdmin :any
    dataUser: any
id:any
  ngOnInit(): void {
    this.id = this.aRoute.snapshot.params['id'];
   this.dataId={value:this.id}
    this.connexionService.recevoir(this.dataId).subscribe((resultat:any)=>{
      this.user=resultat.data
      console.log(this.user)
      this.nom=this.user.nom
      this.prenom=this.user.prenom
      this.adresse=this.user.adresse
      this.username=this.user.pseudo
      this.role=this.user.role
      this.tel=this.user.telephone
    })

    this.connexionService.user().subscribe((resultat:any)=>{
      this.dataUser= resultat.users;
      
    })

    
  }
  modifier(id){

    this.connexionService.modifier(id).subscribe((resultat:any)=>{
      console.log('this.detailUser')
      
    })
  }

}
