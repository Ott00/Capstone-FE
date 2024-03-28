import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment } from 'src/app/interfaces/appointment';
import { AppointmentStatus } from 'src/app/interfaces/appointment-status';
import { User } from 'src/app/interfaces/user';
import { AppointmentService } from 'src/app/services/appointment.service';
import { NewReviewComponent } from '../new-review/new-review.component';
import { ReviewService } from 'src/app/services/review.service';

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
  today: Date = new Date(Date.now());
  appointmentDay!: Date;
  existReview!: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appointmentSrv: AppointmentService,
    private reviewSrv: ReviewService,
    private snackbar: MatSnackBar
  ) {
    this.dialog = data.dialog;
    this.appointment = data.appointment;
    this.isFreelancer = data.isFreelancer;
    this.appointmentDay = new Date(this.appointment.date);
  }

  ngOnInit(): void {
    this.checkReviewExists();
    this.getAppointmentStatus();
  }

  confirmAppointment(id: string) {
    const data = {
      appointment_status_id: '52f98834-d700-424b-8436-9f1562ddbb8c',
    };
    this.appointmentSrv.updateStatusAppointment(id, data).subscribe(() => {
      this.dialog.closeAll();
      this.snackbar.open('Appuntamento confermato!', 'Ok', { duration: 2500 });
    });
  }

  declineAppointment(id: string) {
    const data = {
      appointment_status_id: '52f98814-d700-434b-8436-9f1562ddbb8c',
    };
    this.appointmentSrv.updateStatusAppointment(id, data).subscribe(() => {
      this.dialog.closeAll();
      this.snackbar.open('Appuntamento declinato!', 'Ok', { duration: 2500 });
    });
  }

  getAppointmentStatus() {
    this.appointmentSrv.getAppointmentStatus().subscribe((response) => {
      this.appointmentStatus = response;
    });
  }

  checkReviewExists() {
    this.reviewSrv
      .checkReviewExists(this.appointment.performance.id)
      .subscribe((response) => {
        this.existReview = response;
      });
  }

  createReview(a: Appointment, existReview: boolean) {
    const dialog = this.dialog.open(NewReviewComponent, {
      data: {
        appointment: a,
        dialog: this.dialog,
        existReview: existReview,
      },
    });

    dialog.afterClosed().subscribe(() => {
      //
    });
  }
}
