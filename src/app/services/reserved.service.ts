import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { ResponseCategory } from '../interfaces/response-category';
import { ResponseService } from '../interfaces/response-service';
import { Service } from '../interfaces/service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservedService {
  meUrl = environment.meUrl;
  categoryBaseUrl = environment.categoryBaseUrl;
  freelancerServicesUrl = environment.freelancerServicesUrl;
  performanceBaseUrl = environment.performanceBaseUrl;

  constructor(private http: HttpClient) {}

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.meUrl}`);
  }

  updateMe(data: User): Observable<User> {
    return this.http.put<User>(`${this.meUrl}`, data);
  }

  getCategories(): Observable<ResponseCategory> {
    return this.http.get<ResponseCategory>(`${this.categoryBaseUrl}`);
  }

  getServices(): Observable<ResponseService> {
    return this.http.get<ResponseService>(`${this.freelancerServicesUrl}`);
  }

  deleteService(id: string) {
    return this.http.delete(`${this.performanceBaseUrl}/${id}`);
  }

  saveService(service: Service): Observable<Service> {
    return this.http.post<Service>(`${this.performanceBaseUrl}`, service);
  }

  editService(service: Service, id: string): Observable<Service> {
    return this.http.put<Service>(`${this.performanceBaseUrl}/${id}`, service);
  }

  editUserAvatar(data: FormData) {
    return this.http.patch(`${this.meUrl}/uploadAvatar`, data);
  }
}
