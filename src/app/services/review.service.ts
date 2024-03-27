import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../interfaces/review';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  reviewBaseUrl = environment.reviewBaseUrl;

  constructor(private http: HttpClient) {}

  createReview(data: Partial<Review>): Observable<Review> {
    return this.http.post<Review>(`${this.reviewBaseUrl}`, data);
  }
}
