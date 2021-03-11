import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassNodeRenderComponent } from './class-node-render.component';

describe('ClassNodeRenderComponent', () => {
  let component: ClassNodeRenderComponent;
  let fixture: ComponentFixture<ClassNodeRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassNodeRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassNodeRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
