import { Time } from '@angular/common';

export interface NewAppointment {
  date: Date;
  time: Time;
  performance_id: string;
}
