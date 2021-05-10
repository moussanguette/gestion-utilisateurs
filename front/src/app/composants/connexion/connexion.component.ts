import { DOCUMENT } from '@angular/common';
import { Component, Inject, NgZone, OnInit, Renderer2 } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  constructor(
    private metaservice: Meta,
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
      {name: 'google-signin-client_id', content :'698363782994-6rnm5babk2fee5vn5c0s9utb9f14142i.apps.googleusercontent.com'}
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
  
  connecter(f){
    console.log(f.value);
  }
}
