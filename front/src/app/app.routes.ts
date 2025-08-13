import { Routes } from '@angular/router';
import { HeroListComponent } from './pages/hero-list/hero-list.component';
import { HeroDetailComponent } from './pages/hero-detail/hero-detail.component';
import { HeroService } from './services/hero.service';
import { HeroAddFormComponent } from './pages/hero-add-form/hero-add-form.component';
import { LoginComponent } from './pages/login/login.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';

export const routes: Routes = [{
    path: '',
    providers: [HeroService],
    children: [
        { path: '', component: HeroListComponent},
        { path: 'hero/:id', component: HeroDetailComponent},
        { path: 'add-hero', component: HeroAddFormComponent, canActivate: [isLoggedInGuard]},
        { path: 'login', component: LoginComponent}
    ]
}];
