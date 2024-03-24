import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpResponseBase,
} from '@angular/common/http';
import { Observable, catchError, switchMap, take, tap, throwError } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { SpinnerService } from '../components/spinner/spinner.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  baseUrl = environment.baseUrl;
  constructor(
    private authSrv: AuthService,
    private spinnerSrv: SpinnerService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerSrv.requestStarted();
    return this.setAuthorization(next, request);
  }

  setAuthorization(
    next: HttpHandler,
    request: HttpRequest<unknown>
  ): Observable<HttpEvent<unknown>> {
    return this.authSrv.user$.pipe(
      take(1),
      switchMap((user) => {
        if (!user) {
          return next.handle(request);
        } else {
          request = request.clone({
            headers: request.headers.set(
              'Authorization',
              `Bearer ${user.accessToken}`
            ),
          });
        }
        return next.handle(request).pipe(
          tap((event) => {
            if (event instanceof HttpResponse) {
              this.spinnerSrv.requestEnded();
            }
          }),
          catchError((error: HttpErrorResponse) => {
            this.spinnerSrv.requestEnded();
            return throwError(error);
          })
        );
      }),
      catchError((error: HttpErrorResponse) => {
        this.spinnerSrv.requestEnded();
        return throwError(error);
      })
    );
  }
}
