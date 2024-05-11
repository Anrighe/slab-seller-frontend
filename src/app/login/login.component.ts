import { Component } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from "@angular/material/button";
import { ThemePalette } from "@angular/material/core";
import { Router } from "@angular/router";

import { AuthenticationRequestDTO, AuthenticationResourceService } from "../../openapi";
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


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
        
        //TODO: make username, password mandatory with validators
        
        this.loginForm = new FormGroup({
            'username': new FormControl(''),
            'password': new FormControl('')
        });
    }

    hidePassword = true;
    colorControl = new FormControl('primary' as ThemePalette);

    // TODO: substitute this method with a call to the authentication service
    redirectToHomePage() {
        this.router.navigate(['']);
    }


    login() {
        console.log(this.loginForm.value.username);
        console.log("LOGGING IN");
        
        let loginRequest: AuthenticationRequestDTO = {
            //username: this.loginForm.value.username,
            //password: this.loginForm.value.password
            username: "developer",
            password: "123"
        };

        this.authenticationService.apiAuthenticationTokenRequestPost(loginRequest).subscribe(response => {

            console.log('Login successful', response);
            
            this.router.navigate(['']);
        }, error => {
            console.error('Login failed', error);
        })
    }
}