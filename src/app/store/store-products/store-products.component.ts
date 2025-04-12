import {NgFor, NgOptimizedImage} from "@angular/common";
import { Component } from "@angular/core";
import { StorePaginatorComponent } from "../store-paginator/store-paginator.component";
import {ApiModule, AuthenticationResourceService, ProductResourceService, SlabDTO} from "../../../openapi";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import {TokenService} from "../../auth/token.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
    selector: 'app-store-products',
    templateUrl: './store-products.component.html',
    styleUrls: ['./store-products.component.scss'],
    standalone: true,
  imports: [
    NgFor,
    StorePaginatorComponent,
  ]
})
export class StoreProductsComponent {
  private subscriptions: Subscription[] = [];
  products: Array<SlabDTO> | undefined;

  constructor(
    private productResourceService: ProductResourceService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('sessionToken');
    console.log("using token:", token);

    if (!token) {
      console.error('No token found');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });

    console.log(headers);

    const options = {
      headers: headers,
      transferCache: false,
    };

    // Call the productsTypeGet method with the Authorization header
    const subscription = this.productResourceService.productsTypeGet("body", false, options).subscribe({
      next: (response) => {
        this.products = response;
        console.log('Products:', this.products);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });


    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
