import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { WelcomeComponent } from '../welcome/welcome.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'users', loadChildren: () => import('../welcome/welcome.module').then(m => m.WelcomeModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
