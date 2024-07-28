import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { 
	AuthenticationRequestDTO, 
	AuthenticationResourceService, 
	TokenValidationRequestDTO, 
	TokenRefreshRequestDTO } from "../../openapi";
import { BehaviorSubject, Observable, Subscription, catchError, firstValueFrom, map, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {
	
	private subscriptions: Subscription[] = [];
	private userAuthenticatedSubject = new BehaviorSubject<boolean>(false); // Only used to hide parts of the UI
	constructor(private authenticationService: AuthenticationResourceService, private router: Router) {}
	
	/**
	 * Handles login requests
	 * @param username
	 * @param password 
	*/
	login(username: string, password: string): Observable<any> {
		
		let loginRequest: AuthenticationRequestDTO = {
			username: username,
			password: password
		};
		
		return this.authenticationService.apiAuthenticationTokenRequestPost(loginRequest).pipe(
			tap(response => {
				localStorage.setItem('sessionToken', response.token);
				localStorage.setItem('refreshSessionToken', response.refreshToken);
				this.userAuthenticatedSubject.next(true);
				
				console.log("Credentials successfully validated, deploying token...");
			}),
			catchError(error => {
				console.log("Error during credentials validation");
				this.userAuthenticatedSubject.next(false);
				throw error;
			})
		);
	}
	
	
	async isLocalStorageTokenValid(): Promise<boolean> {
		// If the type of window is undefined, no variable will be retreived from the localStorage
		if (typeof window !== 'undefined') {

			let localStorageToken = localStorage.getItem('sessionToken');
			//let localStorageRefreshToken = localStorage.getItem('refreshSessionToken'); //TODO: do I want to check if the refresh token is valid by requesting a new token from here?

			if (localStorageToken !== null) {
				const tokenValidationRequest: TokenValidationRequestDTO = { token: localStorageToken };
					try {
						const response = await firstValueFrom(
							this.authenticationService.apiAuthenticationTokenValidatePost(tokenValidationRequest)
						);
						console.log("Response from local storage token validation, tokenValid:", response.tokenValid);
						this.userAuthenticatedSubject.next(true);
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

	saveTokensOnLocalStorage(token: string, refreshToken: string) {
		localStorage.setItem('sessionToken', token);
		localStorage.setItem('refreshSessionToken', refreshToken)
	}

	getUserAuthenticatedUI(): Observable<boolean> {
		return this.userAuthenticatedSubject.asObservable();
	}
	
	//TODO: Check which method to use for the unsubscribe
	onDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}
	

}