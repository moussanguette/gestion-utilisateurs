import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { IUtilisateur } from "../models/dossier";
import { catchError, tap } from 'rxjs/operators'


@Injectable({
    providedIn: 'root'
})

export class utilisateurListService {

    private readonly UTILISATEUR_API_URL = 'api/utilisateurs.json'


    constructor(private http: HttpClient) {

    }

    public getUtilisateurs(): Observable<IUtilisateur[]> {

        return this.http.get<IUtilisateur[]>(this.UTILISATEUR_API_URL).pipe(
            tap(utilisateurs => console.log('utilisateurs: ',utilisateurs)),
            catchError(this.handleError),
        );
    }


    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message.
        return throwError(
          'Something bad happened; please try again later.');
      }
}