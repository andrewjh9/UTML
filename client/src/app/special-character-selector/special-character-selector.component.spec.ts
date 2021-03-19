import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialCharacterSelectorComponent } from './special-character-selector.component';

describe('SpecialCharacterSelectorComponent', () => {
  let component: SpecialCharacterSelectorComponent;
  let fixture: ComponentFixture<SpecialCharacterSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialCharacterSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialCharacterSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
