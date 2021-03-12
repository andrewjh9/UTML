import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeFormattingModalComponent } from './edge-formatting-modal.component';

describe('EdgeFormattingModalComponent', () => {
  let component: EdgeFormattingModalComponent;
  let fixture: ComponentFixture<EdgeFormattingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdgeFormattingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeFormattingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
