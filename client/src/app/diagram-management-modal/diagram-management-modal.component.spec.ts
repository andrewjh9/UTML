import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramManagementModalComponent } from './diagram-management-modal.component';

describe('DiagramManagementModalComponent', () => {
  let component: DiagramManagementModalComponent;
  let fixture: ComponentFixture<DiagramManagementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramManagementModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramManagementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
