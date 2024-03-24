import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseUsers } from '../interfaces/response-users';

@Injectable({
  providedIn: 'root',
})
export class ExpertsService {
  userUrl = environment.userBaseUrl;

  constructor(private http: HttpClient) {}

  getUsers(page?: number, size?: number) {
    return this.http.get<ResponseUsers>(
      `${this.userUrl}?page=${page}&size=${size}`
    );
  }
}
