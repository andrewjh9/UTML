import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicNodeTextComponent } from './basic-node-text.component';

describe('BasicNodeTextComponent', () => {
  let component: BasicNodeTextComponent;
  let fixture: ComponentFixture<BasicNodeTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicNodeTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicNodeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
