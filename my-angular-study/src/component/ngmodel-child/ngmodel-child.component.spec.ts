import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgmodelChildComponent } from './ngmodel-child.component';

describe('NgmodelChildComponent', () => {
  let component: NgmodelChildComponent;
  let fixture: ComponentFixture<NgmodelChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgmodelChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgmodelChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
