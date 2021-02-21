import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleNodeComponent } from './rectangle-node.component';

describe('RectangleNodeComponent', () => {
  let component: RectangleNodeComponent;
  let fixture: ComponentFixture<RectangleNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RectangleNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
