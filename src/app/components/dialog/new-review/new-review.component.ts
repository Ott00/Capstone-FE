import { NgFor } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment } from 'src/app/interfaces/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.scss'],
})
export class NewReviewComponent implements OnInit {
  dialog: MatDialog;
  appointment: Appointment;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reviewSrv: ReviewService,
    private snackbar: MatSnackBar
  ) {
    this.dialog = data.dialog;
    this.appointment = data.appointment;
  }

  ngOnInit(): void {}

  createReview(newReview: NgForm, performanceId: string) {
    newReview.form.addControl('performance_id', new FormControl(performanceId));
    this.reviewSrv.createReview(newReview.value).subscribe((response) => {
      console.log(response);
      this.dialog.closeAll();
      this.snackbar.open('Recensione aggiunta!', 'Ok', { duration: 2500 });
    });
  }
}
