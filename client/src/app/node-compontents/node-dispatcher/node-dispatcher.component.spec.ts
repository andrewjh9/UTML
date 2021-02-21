import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDispatcherComponent } from './node-dispatcher.component';

describe('NodeDispatcherComponent', () => {
  let component: NodeDispatcherComponent;
  let fixture: ComponentFixture<NodeDispatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeDispatcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDispatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
