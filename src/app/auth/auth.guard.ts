import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthGuard {

	constructor(private authService: AuthService, private router: Router) {};

	async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
		const isAuthenticated = await this.authService.isLocalStorageTokenValid();

		if (isAuthenticated) {

			if (state.url === '/login') {
				return this.router.createUrlTree(['/store']);
			}

			return true;
		} else {

      if (state.url === '/login')
        return true;

      return false;
      // TODO: check why using return this.router.createUrlTree(['/login']) here makes the login screen appears briefly before the store at each requests
		}

	}
}
