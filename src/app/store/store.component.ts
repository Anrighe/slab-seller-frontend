import { Component } from "@angular/core";
import { StoreFilterComponent } from "./store-filter/store-filter.component";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.css'],
    standalone: true,
    imports: [
        StoreFilterComponent,
        MatGridListModule,
        MatSidenavModule,
        MatButtonModule
    ]
})
export class StoreComponent {
    constructor() { }
    ngOnInit() {
        
    }

    showFiller = false;
}