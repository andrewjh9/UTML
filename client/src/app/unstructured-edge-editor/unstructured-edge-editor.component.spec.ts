import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnstructuredEdgeEditorComponent } from './unstructured-edge-editor.component';

describe('UnstructuredEdgeEditorComponent', () => {
  let component: UnstructuredEdgeEditorComponent;
  let fixture: ComponentFixture<UnstructuredEdgeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnstructuredEdgeEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnstructuredEdgeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
