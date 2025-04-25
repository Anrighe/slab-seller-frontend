import { Component } from "@angular/core";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { MatListModule } from '@angular/material/list';
import { StoreProductsComponent } from "./store-products/store-products.component";

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.css'],
    standalone: true,
  imports: [
    MatGridListModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    StoreProductsComponent
  ]
})
export class StoreComponent {

    showFiller = false;
}
