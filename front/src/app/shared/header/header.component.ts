import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isMenuOpen = false;
  private router = inject(Router);

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToAddForm() {
    this.router.navigate(['add-hero'])
  }

}
