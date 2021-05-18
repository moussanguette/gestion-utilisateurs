import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from '../../services/connexion.service';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
form: object
status:any
data:any
id :any
validation : any
  constructor(private connexionService:ConnexionService, private route:Router) { }

  ngOnInit(): void {
  }
  hide = true;
  roleUser : any
  connecter(f:NgForm){
    this.form = f.value
    this.validation=f.status
    return this.connexionService.donne(this.form).subscribe((resultat:any)=>{
      this.status=resultat.status;
      this.data=resultat.userDetail;
      this.id=this.data.id;
      this.roleUser=this.data.role
     if(this.roleUser=="admin"){
      this.route.navigate(['administrateur/'+this.id]);
     }
     else if(this.roleUser=="formateur"){
      this.route.navigate(['formateur/'+this.id]);
     }
     else if(this.roleUser=="etudiant"){
      this.route.navigate(['etudiant/'+this.id]);
     }
     else if(this.roleUser=="finance"){
      this.route.navigate(['finance/'+this.id]);
     }else{
      this.route.navigate(['connexion/']);
     }
    })
    
  }

  
}
