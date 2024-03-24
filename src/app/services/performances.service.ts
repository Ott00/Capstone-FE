import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseService } from '../interfaces/response-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from '../interfaces/service';
import { ResponseImage } from '../interfaces/response-image';

@Injectable({
  providedIn: 'root',
})
export class PerfomancesService {
  performanceBaseUrl = environment.performanceBaseUrl;

  constructor(private http: HttpClient) {}

  getPerfomances(): Observable<ResponseService> {
    return this.http.get<ResponseService>(`${this.performanceBaseUrl}`);
  }

  getPerfomancesById(id: string): Observable<Service> {
    return this.http.get<Service>(`${this.performanceBaseUrl}/${id}`);
  }

  getPerformancesByCategory(category: string): Observable<ResponseService> {
    return this.http.get<ResponseService>(
      `${this.performanceBaseUrl}/filter?category=${category}`
    );
  }

  getPerformancesFiltered(
    price: string,
    category: string
  ): Observable<ResponseService> {
    const filterPrice = price != '' ? `direction=${price}` : '';
    const filterCategory = category != '' ? `category=${category}` : '';
    return this.http.get<ResponseService>(
      `${this.performanceBaseUrl}/filter?${filterPrice}&${filterCategory}`
    );
  }

  searchPerformanceByInput(searchInput: string): Observable<ResponseService> {
    return this.http.get<ResponseService>(
      `${this.performanceBaseUrl}/search?searchInput=${searchInput}`
    );
  }

  uploadPerformanceImage(image: FormData): Observable<ResponseImage> {
    return this.http.post<ResponseImage>(
      `${this.performanceBaseUrl}/uploadImage`,
      image
    );
  }
}
