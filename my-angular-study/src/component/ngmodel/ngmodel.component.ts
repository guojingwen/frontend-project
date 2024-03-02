import { Component } from '@angular/core';
import { NgmodelChildComponent } from '../ngmodel-child/ngmodel-child.component';

@Component({
  selector: 'app-ngmodel',
  standalone: true,
  imports: [NgmodelChildComponent],
  templateUrl: './ngmodel.component.html',
})
export class NgmodelComponent {
  username = 'zhangsan'
}
