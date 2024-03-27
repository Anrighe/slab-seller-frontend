import { Component } from "@angular/core";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MENU_ITEMS, MenuItem } from "./menu-items";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone : true,
  imports: [MatMenuModule, MenuComponent, MatIconModule, MatButtonModule, MatToolbarModule, CommonModule]
})
export class MenuComponent {
  constructor() { }


  menuItems: MenuItem[] = MENU_ITEMS;

  
}