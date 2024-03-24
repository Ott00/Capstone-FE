import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { ReservedService } from 'src/app/services/reserved.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  user!: User;

  constructor(private reservedSrv: ReservedService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.reservedSrv.getMe().subscribe((response) => {
      this.user = response;

      if (this.user && this.user.role !== route.data['expectedRole']) {
        this.router.navigate(['/']);
      }
    });

    return true;
  }
}
