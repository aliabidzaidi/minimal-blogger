import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginRedirectGuard } from 'src/sdk/guards/login-redirect.guard';
import { LoginGuard } from 'src/sdk/guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login', canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard]},
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
