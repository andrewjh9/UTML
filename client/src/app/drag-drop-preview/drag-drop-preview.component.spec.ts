import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropPreviewComponent } from './drag-drop-preview.component';

describe('DragDropPreviewComponent', () => {
  let component: DragDropPreviewComponent;
  let fixture: ComponentFixture<DragDropPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
