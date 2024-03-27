import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StoreComponent } from "./store.component";
import { StoreRoutingModule } from "./store.routing";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule,
        StoreRoutingModule
        //RouterModule.forChild([
        //    { path: '', component: StoreComponent },
        //]),
    ]
})
export class StoreModule {
    constructor() { }
    ngOnInit() {
    }
}