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
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private errorSrv: ErrorService,
    private spinnerSrv: SpinnerService,
    private snackbar: MatSnackBar
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

        if (err.error.message == 'Error in payload') {
          const errorString: string = err.error.errorsList[0];
          this.snackbar.open(errorString, 'Ok', { duration: 2500 });
        } else {
          this.snackbar.open(err.error.message, 'Ok', { duration: 2500 });
        }

        // console.log(err.error);

        return of(err.error);
      })
    );
  }
}
