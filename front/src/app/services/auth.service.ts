import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { map, Observable, tap } from 'rxjs';

export interface LoginCredentials {
  email: string;
  password: string;
}
export interface RegisterCredentials extends LoginCredentials {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private BASE_URL = 'https://heroes-app-api.onrender.com/'

  user = signal<User | null | undefined>(undefined)

  login(credentials: LoginCredentials): Observable<User | null | undefined> {
    return this.http.post(this.BASE_URL + 'login', credentials).pipe(
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

  register(credentials: RegisterCredentials): Observable<User | null | undefined> {
    return this.http.post(this.BASE_URL + 'register', credentials).pipe(
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
    return this.http.post(this.BASE_URL + 'logout', null).pipe(
      tap((result: any) => {
        localStorage.removeItem('token');
        this.user.set(null);
      })
    )
  }

}
