import { Component, Inject, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Review } from 'src/app/interfaces/review';
import { ReservedService } from 'src/app/services/reserved.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.scss'],
})
export class EditReviewComponent implements OnInit {
  review: Review;
  selectedRating: number;
  dialog: MatDialog;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reviewSrv: ReviewService,
    private snackbar: MatSnackBar
  ) {
    this.review = data.review;
    this.selectedRating = this.review.evaluation;
    this.dialog = data.dialog;
  }

  ngOnInit(): void {}

  updateReview(newReview: NgForm, performanceId: string) {
    newReview.form.addControl('performance_id', new FormControl(performanceId));
    newReview.form.addControl(
      'evaluation',
      new FormControl(this.selectedRating)
    );
    this.reviewSrv
      .updateReview(newReview.value, this.review.id)
      .subscribe((response) => {
        this.dialog.closeAll();
        this.snackbar.open('Recensione modificata!', 'Ok', { duration: 2500 });
      });
  }

  updateRating(rating: number) {
    this.selectedRating = rating;
  }
}
