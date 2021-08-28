import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeRenderDispatchComponent } from './edge-render-dispatch.component';
import {Position} from "../../../model/position";
import {Edge} from "../../../model/edge/edge";

describe('EdgeRenderDispatchComponent', () => {
  let component: EdgeRenderDispatchComponent;
  let fixture: ComponentFixture<EdgeRenderDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdgeRenderDispatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeRenderDispatchComponent);
    component = fixture.componentInstance;
    component.edge = new Edge(new Position(0, 0), new Position(0, 0));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
