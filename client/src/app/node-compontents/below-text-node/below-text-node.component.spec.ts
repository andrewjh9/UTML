import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BelowTextNodeComponent } from './below-text-node.component';

describe('BelowTextNodeComponent', () => {
  let component: BelowTextNodeComponent;
  let fixture: ComponentFixture<BelowTextNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BelowTextNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BelowTextNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
