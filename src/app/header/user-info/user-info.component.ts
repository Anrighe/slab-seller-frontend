import { Component } from "@angular/core";

import { AuthService } from "../../auth/auth.service";

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrl: './user-info.component.css',
    standalone : true,
})
export class UserInfoComponent {
  constructor(public authService: AuthService) { }
  userIconFilename: String = 'user.png';
}