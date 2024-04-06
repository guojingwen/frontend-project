import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { TimerComponent } from './timer/timer.component';
import { NgmodelComponent } from '../component/ngmodel/ngmodel.component';
import { DirectiveComponent } from 'src/component/directive/directive.component';
// import { HighlightDirective } from 'src/component/directive/highlight.directive';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'timer', component: TimerComponent },
  { path: 'ngmodel', component: NgmodelComponent },
  { path: 'directive', component: DirectiveComponent, runGuardsAndResolvers: 'always' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
