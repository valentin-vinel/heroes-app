import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../heroes/hero';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit {

  // hero: Hero

  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    const heroId: string | null = this.router.snapshot.paramMap.get('id');

  }

}
