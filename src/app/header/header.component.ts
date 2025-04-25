import {Component, inject} from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../auth/auth.service';
import { LogoTitleComponent } from "./logo-title/logo-title.component";
import { SectionsComponent } from "./sections/sections.component";
import { NgFor, NgIf } from "@angular/common";
import { Subscription } from "rxjs";
import { Sections, USER_SECTIONS } from "../commons/sections";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, LogoTitleComponent, SectionsComponent],
})
export class HeaderComponent {

  userAuthenticated: Boolean = false;
  subscriptions: Subscription[] = [];
  section: Sections[] = USER_SECTIONS;

  private authService: AuthService = inject(AuthService);

  constructor() {
    const subscription = this.authService.getUserAuthenticatedUI().subscribe(
      (isAuthenticated) => {
        this.userAuthenticated = isAuthenticated;
      }
    );

    this.subscriptions.push(subscription);
  }

  onDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
