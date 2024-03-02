import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'
import { DirectiveComponent } from './directive/directive.component'

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'directive', component: DirectiveComponent },
];
