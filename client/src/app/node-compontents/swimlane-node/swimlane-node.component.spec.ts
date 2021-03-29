import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwimlaneNodeComponent } from './swimlane-node.component';

describe('SwimlaneNodeComponent', () => {
  let component: SwimlaneNodeComponent;
  let fixture: ComponentFixture<SwimlaneNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwimlaneNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwimlaneNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
