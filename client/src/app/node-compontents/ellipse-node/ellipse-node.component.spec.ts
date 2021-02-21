import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EllipseNodeComponent } from './ellipse-node.component';

describe('EllipseNodeComponent', () => {
  let component: EllipseNodeComponent;
  let fixture: ComponentFixture<EllipseNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EllipseNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EllipseNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
