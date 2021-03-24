import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapesetManagementModalComponent } from './shapeset-management-modal.component';

describe('ShapesetManagementModalComponent', () => {
  let component: ShapesetManagementModalComponent;
  let fixture: ComponentFixture<ShapesetManagementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapesetManagementModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapesetManagementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
