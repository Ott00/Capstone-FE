import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewExpertComponent } from './review-expert.component';

describe('ReviewExpertComponent', () => {
  let component: ReviewExpertComponent;
  let fixture: ComponentFixture<ReviewExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewExpertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
