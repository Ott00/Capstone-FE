import { Component, OnInit } from '@angular/core';
import { ResponseReview } from 'src/app/interfaces/response-review';
import { Review } from 'src/app/interfaces/review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-client',
  templateUrl: './review-client.component.html',
  styleUrls: ['./review-client.component.scss'],
})
export class ReviewClientComponent implements OnInit {
  reviewPageble!: ResponseReview;
  reviews!: Review[];

  constructor(private reviewSrv: ReviewService) {}

  ngOnInit(): void {
    this.getClientReview();
  }

  getClientReview() {
    this.reviewSrv.getClientReview().subscribe((response) => {
      this.reviewPageble = response;
      this.reviews = response.content;
    });
  }
}
