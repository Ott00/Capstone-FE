import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewAppointment } from 'src/app/interfaces/new-appointment';
import { Service } from 'src/app/interfaces/service';
import { User } from 'src/app/interfaces/user';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss'],
})
export class NewAppointmentComponent implements OnInit {
  dialog: MatDialog;
  performance: Service;
  user: User;
  minDate!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appointmentSrv: AppointmentService,
    private snackbar: MatSnackBar
  ) {
    this.performance = data.performance;
    this.dialog = data.dialog;
    this.user = data.user;
  }

  ngOnInit(): void {
    this.getTomorrow();
  }

  getTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
  }

  bookAppointment(newAppointment: NgForm) {
    const payloadAppointment: NewAppointment = {
      date: newAppointment.value.date,
      time: newAppointment.value.time,
      performance_id: this.performance.id,
    };

    this.appointmentSrv.bookAppointment(payloadAppointment).subscribe(() => {
      this.dialog.closeAll();
      this.snackbar.open('Appuntamento richiesto!', 'Ok', { duration: 2500 });
    });
  }
}
