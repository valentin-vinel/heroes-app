import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../heroes/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit {

  hero: Hero = {
    name: '',
    description: '',
    image: '',
    comics: ['']
  }

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private heroService = inject(HeroService)

  ngOnInit() {
    const heroId: string | null = this.route.snapshot.paramMap.get('id');

    if(heroId) {
      this.heroService.getHeroById(+heroId).subscribe(hero => {
        this.hero = hero;
      });
    }
  }

  goToHeroList() {
    this.router.navigate(['/'])
  }

}
