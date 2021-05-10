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
  
  connecter(f){
    this.form = f.value
    //console.log(this.form);
    return this.connexionService.donne(this.form).subscribe((resultat:any)=>{
      this.status=resultat.status;
      this.data=resultat.userDetail;
      this.id=this.data.id;
     //console.log(resultat);
     console.log(this.status);
     console.log(this.data);
     console.log(this.id);
     this.route.navigate(['administrateur/'+this.id]);
     //token check
     
    })
    
  }

  
}
