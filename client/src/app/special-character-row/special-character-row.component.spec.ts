import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialCharacterRowComponent } from './special-character-row.component';

describe('SpecialCharacterRowComponent', () => {
  let component: SpecialCharacterRowComponent;
  let fixture: ComponentFixture<SpecialCharacterRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialCharacterRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialCharacterRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
