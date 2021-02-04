import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowMarkerComponent } from './arrow-marker.component';

describe('ArrowMarkerComponent', () => {
  let component: ArrowMarkerComponent;
  let fixture: ComponentFixture<ArrowMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrowMarkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
