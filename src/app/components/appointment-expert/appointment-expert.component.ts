import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/interfaces/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AppointmentRequestComponent } from '../dialog/appointment-request/appointment-request.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-expert',
  templateUrl: './appointment-expert.component.html',
  styleUrls: ['./appointment-expert.component.scss'],
})
export class AppointmentExpertComponent implements OnInit {
  appointments!: Appointment[];
  pendingAppointment: Appointment[] = [];
  confirmedAppointment: Appointment[] = [];
  declinedAppointment: Appointment[] = [];
  dialog: MatDialog;
  isFreelancer: boolean = true;

  constructor(
    private appointmentSrv: AppointmentService,
    private dialogRef: MatDialog
  ) {
    this.dialog = dialogRef;
  }

  ngOnInit(): void {
    this.getMyAppointments();
  }

  getMyAppointments() {
    this.appointmentSrv.getMyAppointments().subscribe((response) => {
      this.appointments = response.content;
      this.pendingAppointment = this.appointments.filter(
        (appointment) => appointment.appointmentStatus.status === 'ATTESA'
      );
      this.confirmedAppointment = this.appointments.filter(
        (appointment) => appointment.appointmentStatus.status === 'CONFERMATO'
      );
      this.declinedAppointment = this.appointments.filter(
        (appointment) => appointment.appointmentStatus.status === 'DECLINATO'
      );
    });
  }

  reviewAppointment(a: Appointment) {
    const dialog = this.dialogRef.open(AppointmentRequestComponent, {
      data: {
        appointment: a,
        dialog: this.dialog,
        isFreelancer: this.isFreelancer,
      },
    });

    dialog.afterClosed().subscribe(() => {
      this.getMyAppointments();
    });
  }
}
