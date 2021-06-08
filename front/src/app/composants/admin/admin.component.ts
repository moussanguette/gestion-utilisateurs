import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnexionService } from '../../services/connexion.service';
import { IAdmin }  from './admin';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  
  constructor(private connexionService:ConnexionService, private aRoute: ActivatedRoute,private route: Router) { }
  public admins: any[] = [
    
  ];
  private _adminFilter = 'Utilisateurs';
  public filteredadmins: IAdmin[] = [];

  dataId : object
  user:any
  nom :any
  
  prenom :any
  adresse :any
  age :any
  username :any
  role :any
  isAdmin :any
  dataUser: any
 // idA:any
  @Input() idA:any
  ngOnInit(): void {
    this.filteredadmins = this.admins;
   this.idA = this.aRoute.snapshot.params['id'];
   this.dataId={value:this.idA}
    //console.log(this.dataId)
    this.connexionService.recevoir(this.dataId).subscribe((resultat:any)=>{
      //console.log(resultat)
      this.user=resultat.data
      console.log(this.user)
      this.nom=this.user.nom
      this.prenom=this.user.prenom
      this.adresse=this.user.adresse
      this.username=this.user.username
      this.role=this.user.role
    })
    
//recuperation des utilisateurs
    this.connexionService.user().subscribe((resultat:any)=>{
      this.dataUser= resultat.users;
      
    })

}
detailUser:any
infoUser:any
detailId:any
nomUser:any
prenomUser:any
roleUser:any
mailUser:any
telUser:any
ageUser:any
pseudoUser:any
modId:any
etat = false
detail(detailId){
  this.etat = true
  this.infoUser={info:detailId}
  this.detailId=detailId
  console.log(detailId)
  //this.route.navigate(['administrateur/utilisateur/'+detailId])
  this.connexionService.recevoirDetail(this.infoUser).subscribe((resultat:any)=>{
    this.detailUser=resultat.data
    this.nomUser = resultat.data.nom
    this.prenomUser=resultat.data.prenom
    this.roleUser = resultat.data.role
    this.telUser = resultat.data.telephone
    this.pseudoUser = resultat.data.pseudo
    this.mailUser = resultat.data.email
    
    console.log(this.detailUser)
    
  })
}

ajouter(){
  this.route.navigate(['administrateur/inscription/'+this.idA])
}
delId:any
Supprimer(detailId){
  this.delId={delId:detailId}

  //dfghjk

  Swal.fire({
    title: 'Tu-es sur?',
    text: 'L\'utilisateur sera supprimé!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ok',
    cancelButtonText: 'Annulé'
  }).then((result) => {
    if (result.isConfirmed) {

      //fghj
      this.connexionService.supp(this.delId).subscribe((resultat:any)=>{
        console.log(resultat)
        location.reload();
      })
      Swal.fire(
        'Supprimé!',
        'L\'utilisateur est bien supprimé.',
        'success'
      )
    // For more information about handling dismissals please visit
    // https://sweetalert2.github.io/#handling-dismissals
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Annulé',
        'Tu as annulé la suppression :)',
        'error'
      )
    }
  })

  //ghjhjh
  
}





private filteradmins( criteria: string): IAdmin[] {
  criteria = criteria.toLocaleLowerCase();

  const res = this.admins.filter(
        (admin: IAdmin) =>  admin.nom.toLocaleLowerCase().indexOf(criteria) != -1
  );
  return res;
}
}
