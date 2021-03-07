import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramDownloadComponent } from './diagram-download.component';

describe('DiagramDownloadComponent', () => {
  let component: DiagramDownloadComponent;
  let fixture: ComponentFixture<DiagramDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
