import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../../models/hero.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-add-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hero-add-form.component.html',
  styleUrl: './hero-add-form.component.css'
})
export class HeroAddFormComponent implements OnInit, OnDestroy {

  readonly #heroService = inject(HeroService);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #fb = inject(FormBuilder);
  #formValuesSubscription: Subscription | null = null;
  #routeSubscription: Subscription | null = null;
  #saveSubscription: Subscription | null = null;
  
  formGroup = this.#fb.group({
    hero_name:['New Hero', [Validators.required]],
    firstname:['New', [Validators.required]],
    lastname:['Hero', [Validators.required]],
    description: ['Description', [Validators.required]],
		profile_img: ['https://i.pinimg.com/736x/21/68/ab/2168abe25678f85a8a788f70fef1cc2f.jpg', [Validators.required]],
		png_img: ['https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ea196117-0b64-49b7-b13f-79f43cf77e53/dc88wpn-8da2f634-c36b-40e0-a943-f305e9408945.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VhMTk2MTE3LTBiNjQtNDliNy1iMTNmLTc5ZjQzY2Y3N2U1M1wvZGM4OHdwbi04ZGEyZjYzNC1jMzZiLTQwZTAtYTk0My1mMzA1ZTk0MDg5NDUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.P88cGE7P0eN8gWCfoXsVlcTo-9hXQgYjgqNAiCwbuiw', [Validators.required]],
    bg_color_1: ['#201E40', [Validators.required]],
    bg_color_2: ['#9186AE', [Validators.required]],
    bg_color_3: ['#AC8A49', [Validators.required]],
    name_color_1: ['#AC8A49', [Validators.required]],
    name_color_2: ['#201E40', [Validators.required]],
    name_color_3: ['#9186AE', [Validators.required]],
	});

  get bgGradient() {
    const { bg_color_1, bg_color_2, bg_color_3 } = this.formGroup.value;
    return `linear-gradient(to right, ${bg_color_1}, ${bg_color_2}, ${bg_color_3})`;
  }

  get nameColorGradient() {
    const { name_color_1, name_color_2, name_color_3 } = this.formGroup.value;
    return `linear-gradient(to right, ${name_color_1}, ${name_color_2}, ${name_color_3})`;
  }
  
  hero: Hero = Object.assign(new Hero(), this.formGroup.value);
  heroId = -1

  ngOnInit(): void {
    this.#formValuesSubscription = this.formGroup.valueChanges.subscribe(data => {
			this.hero = Object.assign(new Hero(), data);
		});
    this.#routeSubscription = this.#route.params.subscribe(params => {
      if (params['id']) {
        this.heroId = parseInt(params['id']);
      }
    });
  }

  ngOnDestroy(): void {
		this.#formValuesSubscription?.unsubscribe();
 		this.#routeSubscription?.unsubscribe();
 	}

  submit(event: Event) {
		event.preventDefault();

    let payload = {
      ...this.hero,
      bg_gradient: this.bgGradient, // ajout du gradient
      name_color: this.nameColorGradient, // ajout du gradient nom
      id_app_user: 1 // valeur fixe pour l'instant
    };

		let saveObservable;
		if (this.heroId === -1) {
			saveObservable = this.#heroService.add(payload);
		} else {
			payload.id = this.heroId;
			saveObservable = this.#heroService.update(payload);
		}
		this.#saveSubscription = saveObservable.subscribe(_ => {
			this.navigateBack();
		})
	}

  isFieldValid(fieldName: string) {
    const formControl = this.formGroup.get(fieldName);
    return formControl?.invalid && ( formControl?.dirty || formControl?.touched );
  }

  navigateBack() {
    this.#router.navigate(['/']);
  }

}
