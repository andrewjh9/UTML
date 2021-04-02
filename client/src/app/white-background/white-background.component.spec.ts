import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteBackgroundComponent } from './white-background.component';

describe('WhiteBackgroundComponent', () => {
  let component: WhiteBackgroundComponent;
  let fixture: ComponentFixture<WhiteBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhiteBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
