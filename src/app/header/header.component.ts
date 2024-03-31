import { Component } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../auth/auth.service';
import { MenuComponent } from "./menu/menu.component";
import { LogoTitleComponent } from "./logo-title/logo-title.component";
import { userInfo } from "os";
import { UserInfoComponent } from "./user-info/user-info.component";
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterStateSnapshot } from "@angular/router";
import { NgIf } from "@angular/common";
import { Subscription } from "rxjs";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MenuComponent, LogoTitleComponent, UserInfoComponent, NgIf],
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) { }
  userAuthenticated = this.authService.isAuthenticated();

}