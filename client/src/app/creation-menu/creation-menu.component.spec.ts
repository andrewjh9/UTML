import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationMenuComponent } from './creation-menu.component';

describe('CreationMenuComponent', () => {
  let component: CreationMenuComponent;
  let fixture: ComponentFixture<CreationMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
