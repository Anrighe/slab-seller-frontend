import { Component } from "@angular/core";
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-store-filter',
    templateUrl: './store-filter.component.html',
    styleUrls: ['./store-filter.component.css'],
    standalone: true,
    imports: [
        MatCardModule
    ]
})
export class StoreFilterComponent {
    constructor() { }

}