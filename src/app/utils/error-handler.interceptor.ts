import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { SpinnerService } from '../components/spinner/spinner.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private errorSrv: ErrorService,
    private spinnerSrv: SpinnerService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        this.spinnerSrv.requestEnded();
        this.errorSrv.setError(err.error.message);
        this.errorSrv.getError();

        console.log(err.error);

        return of(err.error);
      })
    );
  }
}
