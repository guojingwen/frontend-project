import { formatDate } from '@angular/common';
import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, NgZone, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ngzone',
  template: `<span #timeRef></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgzoneComponent implements AfterViewChecked {
  @ViewChild('timeRef', {static: true})
  timeRef: ElementRef| null = null;
  constructor(private ngZone: NgZone, private rd: Renderer2) {
  }
  ngAfterViewChecked(): void {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.rd.setProperty(
          this.timeRef!.nativeElement,
          'innerText',
          formatDate(Date.now(), 'HH:mm:ss:SSS', 'en-US')
        )
      }, 100)
    })
  }
}
