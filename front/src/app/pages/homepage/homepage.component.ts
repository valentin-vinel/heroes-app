import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Hero } from '../../models/hero.model';
import { HomepageService } from '../../services/homepage.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  private router = inject(Router);
  private homepageService = inject(HomepageService);
  
  firstsHeroes = toSignal<Hero[]>(this.homepageService.getFirstsHeroes());
  lastsHeroes = toSignal<Hero[]>(this.homepageService.getLastsHeroes());

  goToHeroDetail(hero: Hero) {
    this.router.navigate(['/hero', hero.id])
  }

  // goToAddHeroForm() {
  //   this.router.navigate(['/add-hero'])
  // }
}
