import { Component } from "@angular/core";

import { AuthService } from "../../auth/auth.service";
import { MatButtonModule } from '@angular/material/button';
import { USER_SECTIONS, Sections } from "../../commons/sections";
import { NgFor } from "@angular/common";


@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.css',
  standalone : true,
  imports: [MatButtonModule, NgFor]
})
export class SectionsComponent {
  constructor(public authService: AuthService) { }
  userIconFilename: String = 'user.png';

  sections: Sections[] = USER_SECTIONS;


}