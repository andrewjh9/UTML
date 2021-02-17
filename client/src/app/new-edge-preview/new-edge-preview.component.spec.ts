import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEdgePreviewComponent } from './new-edge-preview.component';

describe('NewEdgePreviewComponent', () => {
  let component: NewEdgePreviewComponent;
  let fixture: ComponentFixture<NewEdgePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEdgePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEdgePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
