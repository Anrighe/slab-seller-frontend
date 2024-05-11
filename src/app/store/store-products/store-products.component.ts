import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { StorePaginatorComponent } from "../store-paginator/store-paginator.component";

@Component({
    selector: 'app-store-products',
    templateUrl: './store-products.component.html',
    styleUrls: ['./store-products.component.scss'],
    standalone: true,
    imports: [
        NgFor,
        StorePaginatorComponent
    ]
})
export class StoreProductsComponent {

    products = Array.from({length: 30}, (_, i) => i);
}