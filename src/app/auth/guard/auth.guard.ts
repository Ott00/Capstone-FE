import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authSrv: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authSrv.user$.pipe(
      take(1),
      map((user) => {
        if (user) {
          return true;
        }
        // alert(
        //   'Per visualizzare questa risorsa devi essere loggato!\nAccedi o registrati'
        // );
        this.router.navigate(['/login']);
        this.snackbar.open(
          'Per accedere alle risorse devi effettuare il login!',
          'Ok',
          { duration: 2500 }
        );
        return false;
      })
    );
  }
}
