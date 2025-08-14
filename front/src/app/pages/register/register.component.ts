import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, RegisterCredentials } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

 private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  private registerSubscription: Subscription | null = null;

  registerFormGroup = this.formBuilder.group({
    'username': ['', [Validators.required]],
    'email': ['', [Validators.required]],
    'password': ['', [Validators.required]]
  })

  invalidCredentials = false

  register() {
    this.registerSubscription = this.authService.register(
      this.registerFormGroup.value as RegisterCredentials
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

  // goToRegisterForm() {
  //   this.router.navigate(['/'])
  // }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe();
  }

}
