import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../interfaces/review';
import { environment } from 'src/environments/environment';
import { ResponseReview } from '../interfaces/response-review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  reviewBaseUrl = environment.reviewBaseUrl;

  constructor(private http: HttpClient) {}

  checkReviewExists(performanceId: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.reviewBaseUrl}/${performanceId}/check`
    );
  }

  getReview(performanceId: string): Observable<Review> {
    return this.http.get<Review>(`${this.reviewBaseUrl}/${performanceId}/get`);
  }

  getReviewById(reviewId: string): Observable<Review> {
    return this.http.get<Review>(`${this.reviewBaseUrl}/${reviewId}`);
  }

  createReview(data: Review): Observable<Review> {
    return this.http.post<Review>(`${this.reviewBaseUrl}`, data);
  }

  updateReview(data: Review, reviewId: string): Observable<Review> {
    return this.http.put<Review>(`${this.reviewBaseUrl}/${reviewId}`, data);
  }

  getFreelancerReview(): Observable<ResponseReview> {
    return this.http.get<ResponseReview>(`${this.reviewBaseUrl}/freelancer/me`);
  }

  getClientReview(): Observable<ResponseReview> {
    return this.http.get<ResponseReview>(`${this.reviewBaseUrl}/client/me`);
  }
}
