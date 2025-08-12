import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Hero } from '../heroes/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:5000/'

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.BASE_URL + 'heroes').pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }

  getHeroById(id: number): Observable<Hero> {
    return this.http.get<Hero>(this.BASE_URL + 'heroes/' + id).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }

  add(hero: Hero): Observable<Hero> {
		return this.http.post<Hero>(this.BASE_URL + 'heroes', hero).pipe(
			tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
		);
	}

  update(hero: Hero): Observable<Hero> {
		return this.http.put<Hero>(this.BASE_URL + 'heroes/' + hero.id, hero).pipe(
			tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
		);
	}

  delete(id: number): Observable<void> {
		return this.http.delete<void>(this.BASE_URL + 'heroes/' + id);
	}

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

}
