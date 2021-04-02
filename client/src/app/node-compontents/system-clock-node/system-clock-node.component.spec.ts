import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemClockNodeComponent } from './system-clock-node.component';

describe('SystemClockNodeComponent', () => {
  let component: SystemClockNodeComponent;
  let fixture: ComponentFixture<SystemClockNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemClockNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemClockNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
