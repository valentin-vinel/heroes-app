import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
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

  getHeroById(id: number): Observable<Hero> {
    return this.http.get<Hero>('api/heroes/' + id).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }

  add(hero: Hero): Observable<Hero> {
		return this.http.post<Hero>('api/heroes/', hero).pipe(
			tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
		);
	}

  update(hero: Hero): Observable<Hero> {
		return this.http.put<Hero>('api/heroes/' + hero.id, hero).pipe(
			tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
		);
	}

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

}
