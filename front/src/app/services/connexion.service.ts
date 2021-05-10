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
}
