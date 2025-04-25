import {Component, inject} from "@angular/core";
import { Router } from "@angular/router";


@Component({
  selector: 'app-logo-title',
  templateUrl: './logo-title.component.html',
  styleUrls: ['./logo-title.component.css'],
  standalone : true,
})
export class LogoTitleComponent {

  private router: Router = inject(Router);

  logoFilename: String = 'logo.jpg';
  titleFilename: String = 'title.png';

  redirectToHomePage() {
    this.router.navigate(['']);
  }

}

