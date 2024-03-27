import { Component } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from "@angular/material/button";

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
    constructor() { }
    hidePassword = true;
}