import { Component } from "@angular/core";


@Component({
    selector: 'app-logo-title',
    templateUrl: './logo-title.component.html',
    styleUrls: ['./logo-title.component.css'],
    standalone : true,
})
export class LogoTitleComponent {
  constructor() { }

  logoFilename: String = 'logo.jpg';
  titleFilename: String = 'title.png';
  
}

