import { Component, inject } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../auth/auth.service';
import { LogoTitleComponent } from "./logo-title/logo-title.component";
import { SectionsComponent } from "./sections/sections.component";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, LogoTitleComponent, SectionsComponent],
})
export class HeaderComponent {

  private subscriptions: Subscription[] = [];
  protected userAuthenticated: Boolean = false;

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
