import { Component } from "@angular/core";
import { StoreFiltersComponent } from "./store-filters/store-filters.component";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { StoreSidenavService } from "./store-sidenav.service";
import {MatDividerModule} from '@angular/material/divider';

import {MatListModule} from '@angular/material/list';
import { StoreProductsComponent } from "./store-products/store-products.component";
import { StorePaginatorComponent } from "./store-paginator/store-paginator.component";

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.css'],
    standalone: true,
    imports: [
        StoreFiltersComponent,
        MatGridListModule,
        MatSidenavModule,
        MatButtonModule,
        MatDividerModule,
        MatListModule,
        StoreProductsComponent,
        StorePaginatorComponent
    ]
})
export class StoreComponent {
    constructor(public storeSidenavService: StoreSidenavService) { }

    showFiller = false;
}