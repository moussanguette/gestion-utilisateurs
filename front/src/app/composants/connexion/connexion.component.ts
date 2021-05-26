import { Component, Inject, NgZone, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from '../../services/connexion.service';
import { NgForm } from '@angular/forms'

import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

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

guser;
  constructor(private connexionService:ConnexionService, private route:Router, private metaservice: Meta,
    @Inject(DOCUMENT) private doc : Document,
    private renderer: Renderer2,
    ngZone: NgZone
  ) {
    window['onSignIn'] = User => ngZone.run(
      ()  => {
        this.afterSignUp(User);
      }

    );
   }

  ngOnInit(): void {
    this.metaservice.addTags([
      {name: 'google-signin-client_id', content :'304944222101-eo27auhvv2glte546dvjepv23svvgnfv.apps.googleusercontent.com'}
    ]);

    let script = this.renderer.createElement('script');
    script.scr = 'https://apis.google.com/js/platform.js';
    script.defer = true;
    script.async = true;
    this.renderer.appendChild(document.body, script);
  }

  afterSignUp(googleUser) {
    console.log(googleUser);
    //this.guser = googleUser;
  }

  /* connecter(f){
    console.log(f.value);
  } */


  
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
     if(this.roleUser=="Administrateur"){
      this.route.navigate(['administrateur/'+this.id]);
     }
     else if(this.roleUser=="Formateur"){
      this.route.navigate(['formateur/'+this.id]);
     }
     else if(this.roleUser=="Etudiant"){
      this.route.navigate(['etudiant/'+this.id]);
     }
     else if(this.roleUser=="Finance"){
      this.route.navigate(['finance/'+this.id]);
     }else{
      this.route.navigate(['connexion/']);
     }
    })
    
  }

  
}
