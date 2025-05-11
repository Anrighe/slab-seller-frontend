import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserResourceService } from "../../../openapi";

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryResetGuard {

  private userResourceService: UserResourceService = inject(UserResourceService);
  private router: Router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const token = route.paramMap.get('token');

    if (!token) {
      return of(this.router.parseUrl('/login'));
    }

    return this.userResourceService.apiV1UserPasswordrecoveryVerifyPost(token).pipe(
      map(() => true),
      catchError(() => of(this.router.parseUrl('/login')))
    );
  }
}
