import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportDiagramComponent } from './export-diagram.component';

describe('ExportDiagramComponent', () => {
  let component: ExportDiagramComponent;
  let fixture: ComponentFixture<ExportDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
