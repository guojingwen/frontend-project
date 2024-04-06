import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, map } from 'rxjs';

@Component({
  、          app-operator2',
  template: `<p>operator2--{{selectedTabLink$ | async}}</p>`
})

export class Operator2Component implements OnInit {
  constructor(private route: ActivatedRoute) { }

  selectedTabLink$: Observable<string> | undefined;

  ngOnInit(): void {
    this.selectedTabLink$ = this.route.queryParamMap.pipe(
      filter(params => params.has('tabLink')),
      map(params => params.get('tabLink'))
    ) as any;
  }
}


