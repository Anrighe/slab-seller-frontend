import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { 
	AuthenticationRequestDTO, 
	AuthenticationResourceService, 
	TokenValidationRequestDTO, 
	TokenRefreshRequestDTO } from "../../openapi";
import { Observable, Subscription, catchError, firstValueFrom, map, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {
	
	subscriptions: Subscription[] = [];
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
				
				console.log("Credentials successfully validated, deploying token...");
			}),
			catchError(error => {
				console.log("Error during credentials validation");
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
				let tokenValidationRequest: TokenValidationRequestDTO = {
					token: localStorageToken
				}
				
				return new Promise<boolean>((resolve, reject) => {
					const subscription: Subscription = this.authenticationService.apiAuthenticationTokenValidatePost(tokenValidationRequest)
							.subscribe({
									next: response => {
											console.log("Response from local storage token validation, tokenValid: " + response.tokenValid); 
											resolve(response.tokenValid);
									},
									error: error => {
											console.log("Error during local storage token validation");
											reject(error);
									}
							});

							// Cleanup subscription on completion
							subscription.add(() => {
								subscription.unsubscribe();
						});
				});
			}
		}

		return false;

	}

	saveTokensOnLocalStorage(token: string, refreshToken: string) {
		localStorage.setItem('sessionToken', token);
		localStorage.setItem('refreshSessionToken', refreshToken)
	}
	
	//TODO: Check which method to use for the unsubscribe
	onDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}
	
	currentUser: String = 'Placeholder User';
	
	isAuthenticated() {
		return !!this.currentUser;
	}

}