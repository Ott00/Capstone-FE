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
  averageEvaluation!: number;
  averageEvaluationForCSS!: string;
  evaluationCounts: { [key: number]: number } = {};
  constructor(private reviewSrv: ReviewService) {}

  ngOnInit(): void {
    this.getFreelancerReview();
  }

  getFreelancerReview() {
    this.reviewSrv.getFreelancerReview().subscribe((response) => {
      this.reviews = response.content;
      this.getAverageReview();
      console.log(this.reviews);
    });
  }

  getAverageReview() {
    const totalEvaluation = this.reviews.reduce(
      (accumulator, review) => accumulator + review.evaluation,
      0
    );
    this.averageEvaluation = totalEvaluation / this.reviews.length;
    //For css stars
    this.averageEvaluationForCSS = `calc(${this.averageEvaluation} / 5 * 100%)`;
    //For value of mat-progress-bar

    for (const review of this.reviews) {
      const evaluation = review.evaluation;

      if (this.evaluationCounts[evaluation]) {
        this.evaluationCounts[evaluation]++;
      } else {
        this.evaluationCounts[evaluation] = 1;
      }
    }

    for (const key in this.evaluationCounts) {
      if (this.evaluationCounts.hasOwnProperty(key)) {
        this.evaluationCounts[key] =
          (this.evaluationCounts[key] / this.reviews.length) * 100;
      }
    }

    console.log(this.evaluationCounts);
  }
}
