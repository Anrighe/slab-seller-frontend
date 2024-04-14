import { Component } from "@angular/core";

@Component({
    selector: 'app-store-paginator',
    templateUrl: './store-paginator.component.html',
    styleUrls: ['./store-paginator.component.scss'],
    standalone: true
})
export class StorePaginatorComponent {
    constructor() { }

    products = Array.from({length: 8}, (_, i) => `Product ${i}`);
    length = 20;
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    pageIndex = 0;
}