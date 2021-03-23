import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearDiagramModalComponent } from './clear-diagram-modal.component';

describe('ClearDiagramModalComponent', () => {
  let component: ClearDiagramModalComponent;
  let fixture: ComponentFixture<ClearDiagramModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearDiagramModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearDiagramModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
