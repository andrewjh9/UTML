import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormattingModalComponent } from './formatting-modal.component';

describe('FormattingModalComponent', () => {
  let component: FormattingModalComponent;
  let fixture: ComponentFixture<FormattingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormattingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormattingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
