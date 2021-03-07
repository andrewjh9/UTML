import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceEdgeComponent } from './sequence-edge.component';

describe('SequenceEdgeComponent', () => {
  let component: SequenceEdgeComponent;
  let fixture: ComponentFixture<SequenceEdgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SequenceEdgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceEdgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
