import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemBoundaryNodeComponent } from './system-boundary-node.component';

describe('SystemBoundaryNodeComponent', () => {
  let component: SystemBoundaryNodeComponent;
  let fixture: ComponentFixture<SystemBoundaryNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemBoundaryNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemBoundaryNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
