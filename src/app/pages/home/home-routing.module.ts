import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { ListblogComponent } from './listblog/listblog.component';
import { AddblogComponent } from './addblog/addblog.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'users', loadChildren: () => import('../welcome/welcome.module').then(m => m.WelcomeModule) },
      { path: 'blogs', component: ListblogComponent },
      { path: 'blog/add', component: AddblogComponent },
      { path: 'blog/:id', component: BlogComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
