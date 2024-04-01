import { Component } from "@angular/core";
import { StoreFilterComponent } from "./store-filter/store-filter.component";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { StoreSidenavService } from "./store-sidenav.service";
import {MatDividerModule} from '@angular/material/divider';

import {MatListModule} from '@angular/material/list';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.css'],
    standalone: true,
    imports: [
        StoreFilterComponent,
        MatGridListModule,
        MatSidenavModule,
        MatButtonModule,
        MatDividerModule,
        MatListModule
    ]
})
export class StoreComponent {
    constructor(public storeSidenavService: StoreSidenavService) { }

    showFiller = false;
}