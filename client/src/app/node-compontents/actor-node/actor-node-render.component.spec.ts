import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorNodeRenderComponent } from './actor-node-render.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
