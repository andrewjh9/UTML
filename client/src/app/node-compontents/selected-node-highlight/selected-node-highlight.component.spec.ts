import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedNodeHighlightComponent } from './selected-node-highlight.component';

describe('SelectedNodeHighlightComponent', () => {
  let component: SelectedNodeHighlightComponent;
  let fixture: ComponentFixture<SelectedNodeHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedNodeHighlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedNodeHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
