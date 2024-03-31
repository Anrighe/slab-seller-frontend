import { Component } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from "@angular/material/button";
import { FormControl } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";

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
    colorControl = new FormControl('primary' as ThemePalette);
}