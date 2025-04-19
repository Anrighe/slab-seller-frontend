import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StoreComponent } from "./store.component";
import { AuthGuard } from "../auth/auth.guard";


const routes: Routes = [
    { path: '', component: StoreComponent,
        canActivate: [AuthGuard],
        children: [
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoreRoutingModule {

}
