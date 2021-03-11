import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondNodeRenderComponent } from './diamond-node-render.component';

describe('DiamondNodeRenderComponent', () => {
  let component: DiamondNodeRenderComponent;
  let fixture: ComponentFixture<DiamondNodeRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiamondNodeRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiamondNodeRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
