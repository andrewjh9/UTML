import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondNodeComponent } from './diamond-node.component';

describe('DiamondNodeComponent', () => {
  let component: DiamondNodeComponent;
  let fixture: ComponentFixture<DiamondNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiamondNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiamondNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
