import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  private http = inject(HttpClient);
  private BASE_URL = 'https://heroes-app-api.onrender.com/'

  getFirstsHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.BASE_URL + 'homepage/first').pipe(
      tap((response: Hero[]) => this.log(response)),
      catchError((error: Error) => this.handleError(error, null))
    )
  }

  getLastsHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.BASE_URL + 'homepage/last').pipe(
      tap((response: Hero[]) => this.log(response)),
      catchError((error: Error) => this.handleError(error, null))
    )
  }


  private log(response: any) {
    console.table(response);
  }
  
  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

}
