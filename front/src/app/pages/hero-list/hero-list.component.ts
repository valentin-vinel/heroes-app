import { Component, inject, OnInit } from '@angular/core';
// import { HEROES } from '../../heroes/mock-heroes-list';
import { Hero } from '../../heroes/hero';
import { Router } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.css'
})
export class HeroListComponent {
  
  private router = inject(Router);
  private heroService = inject(HeroService);
  
  heroList = toSignal(this.heroService.getHeroes());

  goToHeroDetail(hero: Hero) {
    console.log('allo', hero.id)
    this.router.navigate(['/hero', hero.id])
  }

}
