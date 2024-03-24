import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../interfaces/appointment';
import { NewAppointment } from '../interfaces/new-appointment';
import { ResponseAppointments } from '../interfaces/response-appointments';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  appointmentBaseUrl = environment.appointmentBaseUrl;
  appointmentStatusBaseUrl = environment.appointmentStatusBaseUrl;

  constructor(private http: HttpClient) {}

  bookAppointment(newAppointment: NewAppointment): Observable<Appointment> {
    return this.http.post<Appointment>(
      `${this.appointmentBaseUrl}`,
      newAppointment
    );
  }

  getMyAppointments(): Observable<ResponseAppointments> {
    return this.http.get<ResponseAppointments>(`${this.appointmentBaseUrl}/me`);
  }

  getAppointmentStatus(): Observable<any> {
    return this.http.get<any>(`${this.appointmentStatusBaseUrl}`);
  }

  updateStatusAppointment(id: string, data: Object) {
    return this.http.patch(`${this.appointmentBaseUrl}/${id}`, data);
  }
}
