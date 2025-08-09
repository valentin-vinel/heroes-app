import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
// import { HEROES } from './heroes/mock-heroes-list';
import { HeroService } from './services/hero.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private heroService = inject(HeroService);
  private router = inject(Router);

  goToAddHeroForm() {
    this.router.navigate(['add-hero'])
  }

}
