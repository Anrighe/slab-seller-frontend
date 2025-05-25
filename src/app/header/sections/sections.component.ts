import {Component, inject} from "@angular/core";

import { AuthService } from "../../auth/auth.service";
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from "@angular/common";
import { MatMenu, MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { Router, RouterLink } from "@angular/router";

export interface MenuItem {
  label: string;
  link?: string;
  action?: () => void;
}

export interface Sections {
  label: string;
  link?: string;
  menuItems?: MenuItem[];
}


@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.css',
  standalone : true,
  imports: [MatButtonModule, MatMenuModule, NgFor, MatMenu, MatMenuTrigger, RouterLink, NgIf]
})
export class SectionsComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  protected userIconFilename: String = 'user.png';
  protected sections: Sections[];

  constructor() {
    this.sections = [
      {
        label: 'Catalogue',
        link: '/catalogue'
      },
      {
        label: 'My orders',
        link: '/orders'
      },
      {
        label: 'Profile',
        menuItems: [
          { label: 'My Data', link: '/profile/data' },
          { label: 'Settings', link: '/profile/settings' },
          { label: 'Logout', action: () => this.onLogout() }
        ]
      }
    ];
  }

  public onLogout() {
    this.authService.removeLocalStorageTokens();
    this.router.navigate(['/login']).catch(err => {
      console.error('Navigation error:', err);
    });
  }

}
