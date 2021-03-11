import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleNodeRenderComponent } from './rectangle-node-render.component';

describe('RectangleNodeRenderComponent', () => {
  let component: RectangleNodeRenderComponent;
  let fixture: ComponentFixture<RectangleNodeRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RectangleNodeRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleNodeRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
