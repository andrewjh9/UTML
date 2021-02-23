import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickableAttachmentPointsComponent } from './clickable-attachment-points.component';

describe('ClickableAttachmentPointsComponent', () => {
  let component: ClickableAttachmentPointsComponent;
  let fixture: ComponentFixture<ClickableAttachmentPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickableAttachmentPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickableAttachmentPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
