import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossNodeRenderComponent } from './cross-node-render.component';

describe('CrossNodeRenderComponent', () => {
  let component: CrossNodeRenderComponent;
  let fixture: ComponentFixture<CrossNodeRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossNodeRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossNodeRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
