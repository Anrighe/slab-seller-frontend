import { NgFor, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ProductResourceService, SlabDTO} from "../../../openapi";
import { Subscription } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { InfiniteScrollDirective } from "ngx-infinite-scroll";


@Component({
    selector: 'app-store-products',
    templateUrl: './store-products.component.html',
    styleUrls: ['./store-products.component.scss'],
    standalone: true,
  imports: [
    NgFor,
    NgIf,
    InfiniteScrollDirective
  ]
})
export class StoreProductsComponent {
  private PRODUCTS_PER_PAGE = 15;
  private currentPage = 1;
  private limit = this.PRODUCTS_PER_PAGE;
  protected loading = false;

  private subscriptions: Subscription[] = [];
  products: Array<SlabDTO> | undefined;

  private productResourceService: ProductResourceService = inject(ProductResourceService);

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.loadProducts();
    }
  }

  loadMore(): void {
    if (this.loading)
      return;

    this.loading = true;
    this.currentPage++;
    this.loadProducts();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadProducts(): void {
    const token = localStorage.getItem('sessionToken');

    if (!token) {
      console.error('No token found');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });

    const options = {
      headers: headers,
      transferCache: false,
    };

    const subscription = this.productResourceService.productsTypeGet(
      this.limit,
      this.offset,
      "body",
      false,
      options
    ).subscribe({
      next: (response) => {
        console.log(response);
        this.products = [...(this.products || []), ...response];
        this.loading = false;
        console.log('Products:', this.products);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error fetching products:', error);
      }
    });

    this.subscriptions.push(subscription);
  }


  get offset(): number {
    return (this.currentPage - 1) * this.limit;
  }

  trackByProductId(index: number, product: SlabDTO): any {
    return product.id; // Unique identifier for the product
  }

  test() {
    console.log("TEST");
  }

  onScroll(event: any) {
    console.log('Scroll event:', event);
    if (event.target.scrollTop + event.target.clientHeight === event.target.scrollHeight) {
      this.test();
    }
  }
}
