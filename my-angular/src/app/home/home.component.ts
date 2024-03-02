import { Component } from '@angular/core';
import { HeroesComponent } from '../heroes/heroes.component'
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroesComponent],
  template: `
    <p>
      home works!
    </p>
    <app-heroes/>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
