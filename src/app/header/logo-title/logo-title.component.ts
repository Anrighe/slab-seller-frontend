import {Component, inject} from "@angular/core";
import {Router, RouterLink} from "@angular/router";


@Component({
    selector: 'app-logo-title',
    templateUrl: './logo-title.component.html',
    styleUrls: ['./logo-title.component.css'],
    standalone: true,
    imports: [
        RouterLink
    ]
})
export class LogoTitleComponent {

  private router: Router = inject(Router);

  protected logoFilename: String = 'logo.jpg';
  protected titleFilename: String = 'title.png';

  redirectToHomePage() {
    this.router.navigate(['']);
  }

}

