import { Component } from "@angular/core";
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';


@Component({
    selector: 'app-store-filters',
    templateUrl: './store-filters.component.html',
    styleUrls: ['./store-filters.component.css'],
		standalone: true,
		imports: [
			MatCardModule,
			ReactiveFormsModule
			
		]
    
})
export class StoreFiltersComponent {
	
	myForm: FormGroup;
	
	constructor() {
    this.myForm = new FormGroup({
      'minPrice': new FormControl(''),
      'maxPrice': new FormControl('')
    });
  }

	onSubmit() {
    console.log(this.myForm.value);
    // Handle form submission logic here
  }
}