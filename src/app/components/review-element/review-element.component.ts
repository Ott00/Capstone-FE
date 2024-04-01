import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/interfaces/review';
import { Location } from '@angular/common';
import { Appointment } from 'src/app/interfaces/appointment';
import { NewReviewComponent } from '../dialog/new-review/new-review.component';
import { MatDialog } from '@angular/material/dialog';
import { EditReviewComponent } from '../dialog/edit-review/edit-review.component';
import { ReviewClientComponent } from '../review-client/review-client.component';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-element',
  templateUrl: './review-element.component.html',
  styleUrls: ['./review-element.component.scss'],
})
export class ReviewElementComponent implements OnInit {
  @Input() review!: Review;
  currentUrl: string;
  isClient!: boolean;
  dialog!: MatDialog;

  constructor(
    private location: Location,
    private dialogRef: MatDialog,
    private reviewSrv: ReviewService
  ) {
    this.currentUrl = this.location.path();
    this.dialog = dialogRef;
  }

  ngOnInit(): void {
    if (this.currentUrl == '/reserved/clientReviews') {
      this.isClient = true;
    }
  }

  editReview() {
    const dialog = this.dialog.open(EditReviewComponent, {
      data: { review: this.review, dialog: this.dialog },
    });

    dialog.afterClosed().subscribe(() => {
      this.reviewSrv.getReviewById(this.review.id).subscribe((response) => {
        this.review = response;
      });
    });
  }
}
