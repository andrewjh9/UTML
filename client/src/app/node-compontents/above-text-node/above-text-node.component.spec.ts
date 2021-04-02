import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboveTextNodeComponent } from './above-text-node.component';

describe('AboveTextNodeComponent', () => {
  let component: AboveTextNodeComponent;
  let fixture: ComponentFixture<AboveTextNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboveTextNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboveTextNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
