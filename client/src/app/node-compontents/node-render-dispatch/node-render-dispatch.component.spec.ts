import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeRenderDispatchComponent } from './node-render-dispatch.component';

describe('NodeRenderDispatchComponent', () => {
  let component: NodeRenderDispatchComponent;
  let fixture: ComponentFixture<NodeRenderDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeRenderDispatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeRenderDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
