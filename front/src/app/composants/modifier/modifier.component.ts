import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnexionService } from 'src/app/services/connexion.service';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {
  data: any
  form : any
  status : any
  dataId : object
  user:any
  nom :any
  prenom :any
  adresse :any
  tel :any
  pseudo :any
  role :any
  dataUser: any
  id:any
  telephone:any
  email:any
  nomModi:any
  constructor(private location: Location,
              private route:Router,
              private aRoute:ActivatedRoute,
              private connexionService:ConnexionService
    ) { }

  ngOnInit(): void {

    this.id = this.aRoute.snapshot.params['id'];
  this.dataId={value:this.id}
   this.connexionService.recevoir(this.dataId).subscribe((resultat:any)=>{
     this.user=resultat.data
     console.log(this.user)
     this.nom=this.user.nom
     this.prenom=this.user.prenom
     this.adresse=this.user.adresse
     this.pseudo=this.user.pseudo
     this.role=this.user.role
     this.tel=this.user.telephone
     this.email=this.user.email
   })

   this.connexionService.user().subscribe((resultat:any)=>{
     this.dataUser= resultat.users;
     
   })
  }
  retour(){
    this.location.back();
  }
  
  modifier(f){
    this.connexionService.modifier(f.value).subscribe((resultat:any)=>{
      //this.route.navigate(['administrateur/'+this.id]);
      
    })
    console.log(f)
  }

  

}
