import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credentials, LoginService } from '../../services/login.service';
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

  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  private loginSubscription: Subscription | null = null;

  loginFormGroup = this.formBuilder.group({
    'email': ['', [Validators.required]],
    'password': ['', [Validators.required]]
  })

  invalidCredentials = false

  login() {
    console.log('bonjour')
    this.loginSubscription = this.loginService.login(
      this.loginFormGroup.value as Credentials
    ).subscribe({
      next: (result: User | null | undefined) => {
        this.router.navigate(['/'])
      },
      error: error => {
        console.log(error)
        this.invalidCredentials = true;
      }
    })
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

}
