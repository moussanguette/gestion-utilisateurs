import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from 'src/app/services/connexion.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  constructor(private connexionService:ConnexionService, private route:Router) { }
data: any
form : any
status : any

  ngOnInit(): void {
  }
  inscrire(f){
    console.log(f.value)
    this.form = f.value
    return this.connexionService.inscrire(this.form).subscribe((resultat:any)=>{
    console.log(resultat)      
    // this.route.navigate(['administrateur/'+this.id]);
     
    })
  }

}
