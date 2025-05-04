import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthGuard {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  /**
   * Determines whether the current route can be loaded based on the user's authentication status.
   * @param {Route} route - The route the user is attempting to load
   * @param state - The current state of the router, including the target URL
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the route can be loaded, or `false` otherwise
   */
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return this.checkAccess(state.url);
  }

  /**
   * Determines whether the current route can be loaded based on the user's authentication status.
   * @param {Route} route - The route the user is attempting to load
   * @param {UrlSegment[]} segments - The URL segments of the route being loaded
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the route can be loaded, or `false` otherwise
   */
  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const url = `/${segments.map(s => s.path).join('/')}`;
    const result = await this.checkAccess(url);
    return typeof result === 'boolean' ? result : false;
  }

  /**
   * Checks access to a specific URL based on the user's authentication status and redirects to appropriate routes
   *  if the user is authenticated or unauthenticated
   * @param {string} url - The URL the user is trying to access
   * @returns {Promise<boolean | UrlTree>} - A boolean indicating access permission or a UrlTree for redirection
   */
  private async checkAccess(url: string): Promise<boolean | UrlTree> {
    const isAuthenticated = await this.authService.isLocalStorageTokenValid();

    if (isAuthenticated) {
      if (url === '/login' || url === '/register' || url.startsWith('/passwordrecovery')) {
        return this.router.createUrlTree(['/store']);
      }
      return true;
    } else {
      return url === '/login' || url === '/register' || url.startsWith('/passwordrecovery');
    }
  }
}
