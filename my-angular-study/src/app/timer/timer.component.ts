import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})

export class TimerComponent implements OnDestroy {
  number: number = 10;
  timer: any;
  onInput(val: string) {
    console.log(val)
  }
  start() {
    console.log('start', this.number, typeof this.number)
    this.startTimer();
  }
  end() {
    console.log('end');
  }
  startTimer(){
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      --this.number;
      if(this.number === 0) {
        clearInterval(this.timer)
      }
    }, 1000)
  }
  ngOnDestroy(): void {
    clearInterval(this.timer)
  }
}
