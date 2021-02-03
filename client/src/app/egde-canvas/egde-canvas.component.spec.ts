import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeCanvasComponent } from './edge-canvas.component';

describe('EgdeCanvasComponent', () => {
  let component: EdgeCanvasComponent;
  let fixture: ComponentFixture<EdgeCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdgeCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
