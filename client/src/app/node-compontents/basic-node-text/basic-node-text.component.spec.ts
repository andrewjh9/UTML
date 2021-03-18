import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicNodeTextComponent } from './basic-node-text.component';
import {RectangleNode} from "../../../model/node/rectangle-node";
import {Position} from "../../../model/position";

describe('BasicNodeTextComponent', () => {
  let component: BasicNodeTextComponent;
  let fixture: ComponentFixture<BasicNodeTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicNodeTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicNodeTextComponent);
    component = fixture.componentInstance;
    component.node = new RectangleNode(100, 100, Position.zero());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
