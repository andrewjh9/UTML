import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationSidebarComponent } from './creation-sidebar.component';

describe('CreationSidebarComponent', () => {
  let component: CreationSidebarComponent;
  let fixture: ComponentFixture<CreationSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
