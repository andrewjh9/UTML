import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragSelectPreviewComponent } from './drag-select-preview.component';

describe('DragSelectPreviewComponent', () => {
  let component: DragSelectPreviewComponent;
  let fixture: ComponentFixture<DragSelectPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragSelectPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragSelectPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
