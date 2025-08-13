import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { map, Observable, tap } from 'rxjs';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient);
  private BASE_URL = 'https://heroes-app-api.onrender.com/'

  user = signal<User | null | undefined>(undefined)

  login(credentials: Credentials): Observable<User | null | undefined> {
    return this.http.post(this.BASE_URL + 'login', credentials).pipe(
      tap(() => console.log("login allo")),
      tap((result: any) => {
        localStorage.setItem('token', result['token']);
        const user = Object.assign(new User(), result['user']);
        this.user.set(user)
      }),
      map((result: any) => {
        return this.user()
      })
    )
  }

  getUsers(): Observable<User | null | undefined> {
    return this.http.get(this.BASE_URL + "auth/me").pipe(
      tap((result: any) => {
        const user = Object.assign(new User(), result);
        this.user.set(user)
      }),
      map((result: any)=> {
        return this.user();
      })
    )
  }

  logout(): Observable<null> {
    return this.http.get(this.BASE_URL + 'logout').pipe(
      tap((result: any) => {
        localStorage.removeItem('token');
        this.user.set(null);
      })
    )
  }

}
