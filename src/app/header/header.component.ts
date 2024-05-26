import { Component } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../auth/auth.service';
import { MenuComponent } from "./menu/menu.component";
import { LogoTitleComponent } from "./logo-title/logo-title.component";
import { userInfo } from "os";
import { SectionsComponent } from "./sections/sections.component";
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterStateSnapshot } from "@angular/router";
import { NgFor, NgIf } from "@angular/common";
import { Subscription } from "rxjs";
import { Sections, USER_SECTIONS } from "../commons/sections";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MenuComponent, LogoTitleComponent, SectionsComponent, NgIf, NgFor],
})
export class HeaderComponent {

  userAuthenticated = false;
  subscriptions: Subscription[] = [];
  section: Sections[] = USER_SECTIONS;
  
  constructor(private authService: AuthService, private router: Router) {

    const subscription = this.authService.getUserAuthenticatedUI().subscribe(
      (isAuthenticated) => {
        this.userAuthenticated = isAuthenticated;
      }
    );
  }

    



  onDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}