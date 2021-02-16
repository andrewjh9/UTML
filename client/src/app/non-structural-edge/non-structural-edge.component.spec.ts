import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonStructuralEdgeComponent } from './non-structural-edge.component';

describe('NonStructuralEdgeComponent', () => {
  let component: NonStructuralEdgeComponent;
  let fixture: ComponentFixture<NonStructuralEdgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonStructuralEdgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonStructuralEdgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
