import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionSidebarComponent } from './selection-sidebar.component';

describe('SelectionSidebarComponent', () => {
  let component: SelectionSidebarComponent;
  let fixture: ComponentFixture<SelectionSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
