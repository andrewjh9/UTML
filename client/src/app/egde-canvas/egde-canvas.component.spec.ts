import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgdeCanvasComponent } from './egde-canvas.component';

describe('EgdeCanvasComponent', () => {
  let component: EgdeCanvasComponent;
  let fixture: ComponentFixture<EgdeCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgdeCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EgdeCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
