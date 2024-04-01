import { Component } from "@angular/core";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { USER_SECTIONS, Sections } from "../../commons/sections";
import { CommonModule } from '@angular/common';
import { StoreSidenavService } from "../../store/store-sidenav.service";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone : true,
  imports: [MatMenuModule, MenuComponent, MatIconModule, MatButtonModule, MatToolbarModule, CommonModule]
})
export class MenuComponent {
  constructor(private storeSidenavService: StoreSidenavService) { }


  sections: Sections[] = USER_SECTIONS;

  openSidenavBar() {
    this.storeSidenavService.toggleSideNav();
  }

  
}