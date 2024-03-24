import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentExpertComponent } from './appointment-expert.component';

describe('AppointmentExpertComponent', () => {
  let component: AppointmentExpertComponent;
  let fixture: ComponentFixture<AppointmentExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentExpertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
