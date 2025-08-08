import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../../heroes/hero';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
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

  private heroService = inject(HeroService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private formValuesSubscription: Subscription | null = null;
  private routeSubscription: Subscription | null = null;
  private saveSubscription: Subscription | null = null;
  
  formGroup = this.fb.group({
    name:['New Hero', [Validators.required]],
    description: ['Description', [Validators.required]],
		image: ['https://thumbs.dreamstime.com/b/super-hero-silhouette-superhero-homme-de-bande-dessinée-un-héros-ou-en-272846153.jpg', [Validators.required]],
		comics: ['New Hero Comics v1', [Validators.required]]
	});
  
  hero: Hero = Object.assign(new Hero(), this.formGroup.value);
  heroId = -1

  ngOnInit(): void {
    console.log('Hello add form')

    this.formValuesSubscription = this.formGroup.valueChanges.subscribe(data => {
			this.hero = Object.assign(new Hero(), data);
		});
    this.routeSubscription = this.route.params.subscribe(params => {
      if (params['id']) {
        this.heroId = parseInt(params['id']);
      }
    });
  }

  ngOnDestroy(): void {
		this.formValuesSubscription?.unsubscribe();
 		this.routeSubscription?.unsubscribe();
 	}

   submit(event: Event) {
		event.preventDefault();
		let saveObservable;
		if (this.heroId === -1) {
			saveObservable = this.heroService.add(this.hero);
		} else {
			this.hero.id = this.heroId;
			saveObservable = this.heroService.update(this.hero);
		}
		this.saveSubscription = saveObservable.subscribe(_ => {
			this.navigateBack();
		})
	}

  isFieldValid(fieldName: string) {
    const formControl = this.formGroup.get(fieldName);
   return formControl?.invalid && ( formControl?.dirty || formControl?.touched );
  }

  navigateBack() {
    this.router.navigate(['/']);
  }

}
