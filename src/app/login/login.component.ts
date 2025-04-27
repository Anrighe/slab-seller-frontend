import { Component, signal } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import { CommonModule } from "@angular/common";
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
	FormGroup,
	FormControl,
	ReactiveFormsModule,
	Validators } from '@angular/forms';
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import {MatDialogContent} from "@angular/material/dialog";


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	standalone : true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogContent,
    RouterLink
  ]
})
export class LoginComponent {

	loginForm: FormGroup;
	subscriptions: Subscription[] = [];

	usernameErrorMessage = signal('');
	passwordErrorMessage = signal('');
	generalErrorMessage = signal('');

	constructor(private router: Router, private authService: AuthService) {

		this.loginForm = new FormGroup({
			'username': new FormControl('', Validators.required),
			'password': new FormControl('', Validators.required)
		});

		merge(this.loginForm.statusChanges, this.loginForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

	}

	onSubmit() {
		const subscription = this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
			next: response => {
			this.saveTokenOnLocalStorage(response.token, response.refreshToken);
			  console.log("Login successful, tokens are stored");
			  this.router.navigate(['/store']);
			},
			error: error => {
			  console.log("Login failed");

				if (error.status === 401) {
					this.generalErrorMessage.set('Invalid credentials');
				} else {
					this.generalErrorMessage.set('Error during authentication');
				}
			}
		});

		this.subscriptions.push(subscription);
	}

	saveTokenOnLocalStorage(token: string, refreshToken: string) {
		localStorage.setItem('sessionToken', token);
		localStorage.setItem('refreshToken', refreshToken)
	}

	onDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	updateErrorMessage() {
		const usernameControl = this.loginForm.get('username');
		const passwordControl = this.loginForm.get('password');

		if (usernameControl?.hasError('required')) {
			this.usernameErrorMessage.set('You must enter a username');
		} else {
			this.usernameErrorMessage.set('');
		}

    if (passwordControl?.hasError('required')) {
      this.passwordErrorMessage.set('You must enter a password');
    } else {
      this.passwordErrorMessage.set('');
    }
  }
}
