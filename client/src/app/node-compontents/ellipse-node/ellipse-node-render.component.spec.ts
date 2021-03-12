import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EllipseNodeRenderComponent } from './ellipse-node-render.component';

describe('EllipseNodeRenderComponent', () => {
  let component: EllipseNodeRenderComponent;
  let fixture: ComponentFixture<EllipseNodeRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EllipseNodeRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EllipseNodeRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
