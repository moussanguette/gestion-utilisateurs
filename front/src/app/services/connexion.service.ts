import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  

   
  constructor(private webRequestService:WebRequestService) { }

  donne(donne : object){
    return this.webRequestService.post('login',donne)
  }
  recevoir(donne:object){
    return this.webRequestService.get('detail',donne)
  }
  user(){
    return this.webRequestService.getUser('getUser');
  }
  //information personnel de l'utilisateur
  recevoirDetail(donne:object){
    return this.webRequestService.post('info', donne)
  }
  inscrire(donne: object){
    return this.webRequestService.post('register', donne)
  }
  supp(donne: object){
    return this.webRequestService.post('supprimer', donne)
  }
  oublier(donne : object){
    return this.webRequestService.post('oublier', donne)
  }
  modifier(donne : object){
    return this.webRequestService.post('modifier', donne)
  }

}
