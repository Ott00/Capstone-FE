import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from 'src/app/interfaces/appointment';
import { AppointmentStatus } from 'src/app/interfaces/appointment-status';
import { User } from 'src/app/interfaces/user';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment-request',
  templateUrl: './appointment-request.component.html',
  styleUrls: ['./appointment-request.component.scss'],
})
export class AppointmentRequestComponent implements OnInit {
  dialog: MatDialog;
  appointment: Appointment;
  appointmentStatus: AppointmentStatus[] = [];
  isFreelancer?: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appointmentSrv: AppointmentService
  ) {
    this.dialog = data.dialog;
    this.appointment = data.appointment;
    this.isFreelancer = data.isFreelancer;
  }

  ngOnInit(): void {
    this.getAppointmentStatus();
  }

  confirmAppointment(id: string) {
    const data = {
      appointment_status_id: '52f98834-d700-424b-8436-9f1562ddbb8c',
    };
    this.appointmentSrv.updateStatusAppointment(id, data).subscribe(() => {
      this.dialog.closeAll();
    });
  }

  declineAppointment(id: string) {
    const data = {
      appointment_status_id: '52f98814-d700-434b-8436-9f1562ddbb8c',
    };
    this.appointmentSrv.updateStatusAppointment(id, data).subscribe(() => {
      this.dialog.closeAll();
    });
  }

  getAppointmentStatus() {
    this.appointmentSrv.getAppointmentStatus().subscribe((response) => {
      this.appointmentStatus = response;
    });
  }
}
