import { inject, Injectable } from "@angular/core";

import {
	AuthenticationRequestDTO,
	AuthenticationResourceService,
	TokenValidationRequestDTO } from "../../openapi";
import { BehaviorSubject, Observable, Subscription, catchError, firstValueFrom, tap } from "rxjs";
import {TokenService} from "./token.service";

@Injectable({providedIn: 'root'})
export class AuthService {


	private subscriptions: Subscription[] = [];
	private userAuthenticatedSubject = new BehaviorSubject<boolean>(false); // Used to hide parts of the UI

  private authenticationService: AuthenticationResourceService = inject(AuthenticationResourceService);
  private tokenService: TokenService = inject(TokenService);

  /**
   * Handles the login process by sending the user's credentials to the authentication service.
   * If the credentials are valid, the tokens are saved in local storage and the user is authenticated.
   * @param {string} username - The username provided by the user
   * @param {string} password - The password provided by the user
   * @returns {Observable<any>} - An observable that emits the server's response or an error if the login fails
   */
	login(username: string, password: string): Observable<any> {

		let loginRequest: AuthenticationRequestDTO = {
			username: username,
			password: password
		};

		return this.authenticationService.apiV1AuthenticationTokenRequestPost(loginRequest).pipe(
			tap(response => {
        this.saveTokensOnLocalStorage(response.token, response.refreshToken);
				console.log("Credentials successfully validated, deploying token...");
			}),
			catchError(error => {
				console.log("Error during credentials validation");
				this.userAuthenticatedSubject.next(false);
				throw error;
			})
		);
	}

  /**
   * Validates the token stored in the local storage to determine if the user is authenticated, by following these steps:
   * 1. Checks if the `window` object is defined to ensure the code is running in a browser environment
   * 2. Retrieves the `sessionToken` from the local storage
   * 3. If a token is found, sends it to the authentication service for validation
   * 4. Updates the `userAuthenticatedSubject` based on the validation result
   * 5. Logs the validation response or any errors encountered during the process
   * 6. Returns `false` if no token is found or if the validation fails
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the token is valid, otherwise `false`.
   */
	async isLocalStorageTokenValid(): Promise<boolean> {
		// If the type of window is undefined, no variable will be retrieved from the localStorage
		if (typeof window !== 'undefined') {

			let localStorageToken = localStorage.getItem('sessionToken');

			if (localStorageToken !== null) {
				const tokenValidationRequest: TokenValidationRequestDTO = { token: localStorageToken };
					try {
						const response = await firstValueFrom(
							this.authenticationService.apiV1AuthenticationTokenValidatePost(tokenValidationRequest)
						);
						console.log("Response from local storage token validation, tokenValid:", response.tokenValid);
            this.userAuthenticatedSubject.next(response.tokenValid);

            // If the token in the local storage is invalid, remove it
            if (!response.tokenValid) {
              this.tokenService.removeToken();
              this.tokenService.removeRefreshToken();
            }

						return response.tokenValid;
					} catch (error) {
							console.log("Error during local storage token validation", error);
							this.userAuthenticatedSubject.next(false);
							return false;
					}
			}
		}
		return false;
	}

  /**
   * Stores the session token and refresh token in the browser's local storage under the
   *  keys `sessionToken` and `refreshToken`, respectively.
   * @param {string} token - The session token to be saved.
   * @param {string} refreshToken - The refresh token to be saved.
   */
	saveTokensOnLocalStorage(token: string, refreshToken: string) {
		localStorage.setItem('sessionToken', token);
		localStorage.setItem('refreshToken', refreshToken)
	}

  /**
   * Emits the current authentication state of the user.
   * @returns {Observable<boolean>} - `true` if authenticated, otherwise `false`
   */
	getUserAuthenticatedUI(): Observable<boolean> {
		return this.userAuthenticatedSubject.asObservable();
	}

	onDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}


}
