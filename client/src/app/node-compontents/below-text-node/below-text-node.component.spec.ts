import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BelowTextNodeComponent } from './below-text-node.component';
import {RectangleNode} from "../../../model/node/rectangle-node";
import {Position} from "../../../model/position";

describe('BelowTextNodeComponent', () => {
  let component: BelowTextNodeComponent;
  let fixture: ComponentFixture<BelowTextNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BelowTextNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BelowTextNodeComponent);
    component = fixture.componentInstance;
    component.node = new RectangleNode(100, 100, Position.zero())
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
