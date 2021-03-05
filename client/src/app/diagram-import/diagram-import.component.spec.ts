import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramImportComponent } from './diagram-import.component';

describe('DiagramImportComponent', () => {
  let component: DiagramImportComponent;
  let fixture: ComponentFixture<DiagramImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
