import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonIconComponent } from './json-icon.component';

describe('JsonIconComponent', () => {
  let component: JsonIconComponent;
  let fixture: ComponentFixture<JsonIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
