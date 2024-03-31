import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService{
	currentUser: String = 'Placeholder User';

	/*
		To support multiple users with individual authentication states, you typically 
		don't store the authentication state directly in the authentication service. 
		Instead, you rely on the authentication provider (such as Keycloak or Firebase Authentication) 
		to manage user sessions and authentication states. Then, your authentication service can
		interact with this provider to check the authentication state for the current user dynamically.
	*/

	isAuthenticated() {
			return !!this.currentUser;
	}
}