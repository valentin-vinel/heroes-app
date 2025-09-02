import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, LoginCredentials } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  #formBuilder = inject(FormBuilder);
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);

  #loginSubscription: Subscription | null = null;

  loginFormGroup = this.#formBuilder.group({
    'email': ['', [Validators.required]],
    'password': ['', [Validators.required]]
  })

  invalidCredentials = false

  login() {
    this.#loginSubscription = this.#authService.login(
      this.loginFormGroup.value as LoginCredentials
    ).subscribe({
      next: (result: User | null | undefined) => {
        this.#router.navigate(['/'])
      },
      error: error => {
        console.log(error)
        this.invalidCredentials = true;
      }
    })
  }

  goToRegisterForm() {
    this.#router.navigate(['register'])
  }

  ngOnDestroy(): void {
    this.#loginSubscription?.unsubscribe();
  }

}
