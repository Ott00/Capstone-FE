import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/interfaces/review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-expert',
  templateUrl: './review-expert.component.html',
  styleUrls: ['./review-expert.component.scss'],
})
export class ReviewExpertComponent implements OnInit {
  reviews!: Review[];
  constructor(private reviewSrv: ReviewService) {}

  ngOnInit(): void {
    this.getFreelancerReview();
  }

  getFreelancerReview() {
    this.reviewSrv.getFreelancerReview().subscribe((response) => {
      this.reviews = response.content;
      console.log(this.reviews);
    });
  }
}
