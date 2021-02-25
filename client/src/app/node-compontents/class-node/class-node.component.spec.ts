import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassNodeComponent } from './class-node.component';

describe('ClassNodeComponent', () => {
  let component: ClassNodeComponent;
  let fixture: ComponentFixture<ClassNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
