import { Component, Input } from '@angular/core';
import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.css'
})
export class HeroCardComponent {
  @Input() hero!: Hero;
}
