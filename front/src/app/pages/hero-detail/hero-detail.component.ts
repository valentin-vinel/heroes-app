import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero.service';
import { LoadingComponent } from "../../shared/loading/loading.component";

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit {

  hero: Hero | null = null;

  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #heroService = inject(HeroService)
  showDeleteModal = false;

  ngOnInit() {
    const heroId: string | null = this.#route.snapshot.paramMap.get('id');

    if(heroId) {
      this.#heroService.getHeroById(+heroId).subscribe(hero => {
        this.hero = hero;
      });
    }
  }

  goToHeroList() {
    this.#router.navigate(['/'])
  }

  goToDeleteModal() {
    this.showDeleteModal = true;
  }
  closeModal() {
    this.showDeleteModal = false;
  }
  confirmDelete() {
    if (this.hero?.id !== undefined) {
    this.#heroService.delete(this.hero.id).subscribe(() => {
      console.log('Suppression confirmée');
      this.closeModal();
      this.goToHeroList();
    });
  }
  }

}
