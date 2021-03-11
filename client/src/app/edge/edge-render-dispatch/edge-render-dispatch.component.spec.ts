import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeRenderDispatchComponent } from './edge-render-dispatch.component';

describe('EdgeRenderDispatchComponent', () => {
  let component: EdgeRenderDispatchComponent;
  let fixture: ComponentFixture<EdgeRenderDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdgeRenderDispatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeRenderDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
