import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StoreRoutingModule } from "./store.routing-module";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule,
        StoreRoutingModule,
    ]
})
export class StoreModule {
  constructor() { }

  ngOnInit() {
    }
}
