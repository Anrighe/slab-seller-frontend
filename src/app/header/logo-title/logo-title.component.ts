import { Component } from "@angular/core";
import { Router } from "@angular/router";


@Component({
  selector: 'app-logo-title',
  templateUrl: './logo-title.component.html',
  styleUrls: ['./logo-title.component.css'],
  standalone : true,
})
export class LogoTitleComponent {
  constructor(private router: Router) { }

  logoFilename: String = 'logo.jpg';
  titleFilename: String = 'title.png';

  redirectToHomePage() {
    this.router.navigate(['']);
  }
  
}

