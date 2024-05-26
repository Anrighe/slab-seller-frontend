import { Component } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from "@angular/material/button";
import { ThemePalette } from "@angular/material/core";
import { Router } from "@angular/router";
	
import { 
	FormGroup, 
	FormControl, 
	FormsModule, 
	ReactiveFormsModule, 
	Validators } from '@angular/forms';
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";


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
	subscriptions: Subscription[] = [];

	constructor(private router: Router, private authService: AuthService) {
			
			
		this.loginForm = new FormGroup({
			'username': new FormControl('', Validators.required),
			'password': new FormControl('', Validators.required)
		});
	}

	hidePassword = true;
	colorControl = new FormControl('primary' as ThemePalette);

	onSubmit() {

		const subscription = this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
			next: response => {
				this.saveTokenOnLocalStorage(response.token, response.refreshToken);
			  console.log("Login successful, tokens are stored");
			  this.router.navigate(['/store']);
			},
			error: error => {
			  console.log("Login failed");
				//TODO: handle login failed: maybe with a popup?
			}
		});

		this.subscriptions.push(subscription);
	}

	saveTokenOnLocalStorage(token: string, refreshToken: string) {
		localStorage.setItem('sessionToken', token);
		localStorage.setItem('refreshSessionToken', refreshToken)
	}

	onDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}
}