import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from '../../services/connexion.service';

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
  constructor(private connexionService:ConnexionService, private route:Router) { }

  ngOnInit(): void {
  }
  hide = true;
  roleUser : any
  connecter(f){
    this.form = f.value
    return this.connexionService.donne(this.form).subscribe((resultat:any)=>{
      this.status=resultat;
      //this.data=resultat.userDetail;
      //this.id=this.data.id;
      //this.roleUser=this.data.role
     //console.log(resultat);
     console.log('resultat');
     //console.log(this.data);
     //console.log(this.roleUser);
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
