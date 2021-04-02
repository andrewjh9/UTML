import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintOverlayComponent } from './hint-overlay.component';

describe('HintOverlayComponent', () => {
  let component: HintOverlayComponent;
  let fixture: ComponentFixture<HintOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HintOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HintOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
