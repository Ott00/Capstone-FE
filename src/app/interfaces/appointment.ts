import { AppointmentStatus } from './appointment-status';
import { Service } from './service';
import { User } from './user';

export interface Appointment {
  id: string;
  date: string;
  time: string;
  client: User;
  performance: Service;
  appointmentStatus: AppointmentStatus;
}
