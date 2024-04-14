import { Component } from "@angular/core";
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-store-filters',
    templateUrl: './store-filters.component.html',
    styleUrls: ['./store-filters.component.css'],
    standalone: true,
    imports: [
        MatCardModule
    ]
})
export class StoreFiltersComponent {
    constructor() { }

}