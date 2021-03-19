import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorNodeRenderComponent } from './actor-node-render.component';
import {Position} from "../../../model/position";
import {ActorNode} from "../../../model/node/actor-node";

describe('ActorNodeRenderComponent', () => {
  let component: ActorNodeRenderComponent;
  let fixture: ComponentFixture<ActorNodeRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorNodeRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorNodeRenderComponent);
    component = fixture.componentInstance;
    component.node = new ActorNode(100, 100, new Position(0, 0));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
