import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-handle',
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgzoneComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef) { }
  selectedTab = 'aa';
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedTab = params.get('xx') as string
      this.cd.markForCheck()
    })
  }
}
