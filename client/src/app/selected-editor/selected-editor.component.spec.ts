import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedEditorComponent } from './selected-editor.component';

describe('SelectedEditorComponent', () => {
  let component: SelectedEditorComponent;
  let fixture: ComponentFixture<SelectedEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
