import { Routes } from '@angular/router';
import { HeroListComponent } from './pages/hero-list/hero-list.component';
import { HeroDetailComponent } from './pages/hero-detail/hero-detail.component';
import { HeroService } from './services/hero.service';

export const routes: Routes = [{
    path: '',
    providers: [HeroService],
    children: [
        { path: '', component: HeroListComponent},
        { path: 'hero/:id', component: HeroDetailComponent}
    ]
}];
