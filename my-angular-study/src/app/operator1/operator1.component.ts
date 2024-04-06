import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-operator1',
  template: `<p>operator1--{{selectedTabLink}}</p>`
})
export class Operator1Component implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute) { }

  selectedTabLink: string | null = null;

  sub: Subscription | undefined;
  ngOnInit() {
    this.sub = this.route.queryParamMap
    .subscribe((params) => {
      const tabLink = params.get('tabLink')
      if(tabLink) {
        this.selectedTabLink = tabLink;
      }
    });
  }
  ngOnDestroy(): void {
    this.sub!.unsubscribe();
  }
}

