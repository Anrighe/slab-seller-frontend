import { Component } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../auth/auth.service';
import { MenuComponent } from "./menu/menu.component";



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    standalone : true,
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, MenuComponent],
  })
export class HeaderComponent {

  constructor(public authService: AuthService) { }

  logoFilename: String = 'logo.jpg';
  titleFilename: String = 'title.png';
  userIconFilename: String = 'user.png';
}