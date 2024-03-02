import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appGridItem]'
})
export class GridItemDirective {
  constructor(private elr: ElementRef, private rd2: Renderer2) {
    rd2.setStyle(this.elr.nativeElement, 'display', 'grid');
    rd2.setStyle(this.elr.nativeElement, 'grid-template-areas', `'image' 'title'`);
    rd2.setStyle(this.elr.nativeElement, 'place-items', 'center');
    rd2.setStyle(this.elr.nativeElement, 'width', '4rem');
  }
}

@Directive({
  selector: '[appGridItemTitle]'
})
export class GridTitleDirective {
  constructor(private elr: ElementRef, private rd2: Renderer2) {
    rd2.setStyle(this.elr.nativeElement, 'grid-area', 'title');
  }
}
