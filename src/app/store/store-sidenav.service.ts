import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class StoreSidenavService {
    private sideNavOpen = false;

    toggleSideNav() {
        this.sideNavOpen = !this.sideNavOpen;
    }

    getSideNavState() {
        return this.sideNavOpen;
    }
}