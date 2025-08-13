import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnDestroy {

  isMenuOpen = false;
  private router = inject(Router);
  loginService = inject(LoginService)

  private logoutSubscription: Subscription | null = null

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.logoutSubscription = this.loginService.logout().subscribe({
      next: _ => {
        this.router.navigate(['login']);
      },
      error: _ => {
        this.router.navigate(['login']);
      }
    })
  }

  goToAddForm() {
    this.router.navigate(['add-hero'])
  }

  goToLoginForm() {
    this.router.navigate(['login'])
  }

  ngOnDestroy(): void {
    this.logoutSubscription?.unsubscribe();
  }

}
