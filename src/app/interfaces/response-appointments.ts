import { Appointment } from './appointment';
import { Pageable, Sort } from './response-users';

export interface ResponseAppointments {
  content: Appointment[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
