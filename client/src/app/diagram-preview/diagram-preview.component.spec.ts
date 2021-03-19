import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramPreviewComponent } from './diagram-preview.component';
import {Diagram} from "../../model/diagram";

describe('DiagramPreviewComponent', () => {
  let component: DiagramPreviewComponent;
  let fixture: ComponentFixture<DiagramPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramPreviewComponent);
    component = fixture.componentInstance;
    component.diagram = new Diagram();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
