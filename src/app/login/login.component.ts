import { Component } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from "@angular/material/button";
import { ThemePalette } from "@angular/material/core";
import { Router } from "@angular/router";

import { 
	AuthenticationRequestDTO, 
	AuthenticationResourceService, 
	TokenValidationRequestDTO, 
	TokenRefreshRequestDTO } from "../../openapi";
	
import { 
	FormGroup, 
	FormControl, 
	FormsModule, 
	ReactiveFormsModule, 
	Validators } from '@angular/forms';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	standalone : true,
	imports: [
		MatInputModule,
		MatIconModule,
		MatButton,
		ReactiveFormsModule
	]
})
export class LoginComponent {

	loginForm: FormGroup;

	constructor(private router: Router, private authenticationService: AuthenticationResourceService) {

		if (typeof window !== 'undefined') {
			let localStorageToken = localStorage.getItem('sessionToken');
			let localStorageRefreshToken = localStorage.getItem('refreshSessionToken');

				if (localStorageToken !== null) {
							
					let tokenValidationRequest: TokenValidationRequestDTO = {
						token: localStorageToken
					}

					authenticationService.apiAuthenticationTokenValidatePost(tokenValidationRequest).subscribe(response => {
							this.router.navigate(['']);
					}, error => {
							console.log("Local storage token not valid, proceeding to login page");
					})
							
					} else if (localStorageRefreshToken !== null) {

						let tokenRefreshRequest: TokenRefreshRequestDTO = {
							refreshToken: localStorageRefreshToken
						}

						authenticationService.apiAuthenticationTokenRefreshPost(tokenRefreshRequest).subscribe(response => {
							localStorage.setItem('sessionToken', response.token);
							this.router.navigate(['']);
						}, error => {
							console.log("Error while refreshing session token with local storage refresh token, proceeding to login page")
						})
					} 
		}
			
		this.loginForm = new FormGroup({
			'username': new FormControl('', Validators.required),
			'password': new FormControl('', Validators.required)
		});
	}

	hidePassword = true;
	colorControl = new FormControl('primary' as ThemePalette);

	login() {
			
		let loginRequest: AuthenticationRequestDTO = {
			username: this.loginForm.value.username,
			password: this.loginForm.value.password
		};

		this.authenticationService.apiAuthenticationTokenRequestPost(loginRequest).subscribe(response => {
				
			this.saveTokenOnLocalStorage(response.token, response.refreshToken);

			this.router.navigate(['']);
		}, error => {
			console.error('Login failed', error);
		})
	}

	saveTokenOnLocalStorage(token: string, refreshToken: string) {
			localStorage.setItem('sessionToken', token);
			localStorage.setItem('refreshSessionToken', refreshToken)
	}
}