import { Routes } from '@angular/router';
import { HeroListComponent } from './pages/hero-list/hero-list.component';
import { HeroDetailComponent } from './pages/hero-detail/hero-detail.component';
import { HeroService } from './services/hero.service';
import { HeroAddFormComponent } from './pages/hero-add-form/hero-add-form.component';
import { LoginComponent } from './pages/login/login.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [{
    path: '',
    providers: [HeroService],
    children: [
        { path: '', component: HomepageComponent},
        { path: 'heroes', component: HeroListComponent},
        { path: 'hero/:id', component: HeroDetailComponent},
        { path: 'add-hero', component: HeroAddFormComponent},
        { path: 'login', component: LoginComponent},
        { path: 'register', component: RegisterComponent},
    ]
}];
