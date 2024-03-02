import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ngmodel-child',
  standalone: true,
  imports: [],
  templateUrl: './ngmodel-child.component.html',
})
export class NgmodelChildComponent {
  private _username = '';
  @Output()
  usernameChange = new EventEmitter()
  @Input()
  public get username() {
    return this._username
  }
  public set username(value: string) {
    this._username = value;
    this.usernameChange.emit(value);
  }
}
