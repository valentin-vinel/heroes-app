import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Hero } from '../heroes/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private http = inject(HttpClient);

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>('api/heroes').pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
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
