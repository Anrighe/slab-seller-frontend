import { Component } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from "@angular/material/button";
import { FormControl } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone : true,
    imports: [
        MatInputModule,
        MatIconModule,
        MatButton
    ]
})
export class LoginComponent {
    constructor(private router: Router) { }
    hidePassword = true;
    colorControl = new FormControl('primary' as ThemePalette);

    // TODO: substitute this method with a call to the authentication service
    redirectToHomePage() {
        this.router.navigate(['']);
    }
}