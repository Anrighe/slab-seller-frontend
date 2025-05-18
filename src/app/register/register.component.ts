import {Component, inject, signal } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatDialogContent } from "@angular/material/dialog";
import { Router, RouterLink } from "@angular/router";
import { merge, Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {UserCreationRequestDTO, UserResourceService} from "../../openapi";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone : true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogContent,
    RouterLink
  ]
})
export class RegisterComponent {

  protected registerForm: FormGroup;
  protected subscriptions: Subscription[] = [];

  protected showPassword = false;

  protected usernameErrorMessage = signal('');
  protected emailErrorMessage = signal('');
  protected passwordErrorMessage = signal('');
  protected firstNameErrorMessage = signal('');
  protected lastNameErrorMessage = signal('');
  protected generalErrorMessage = signal('');
  protected successMessage = signal('');

  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private userResourceService: UserResourceService = inject(UserResourceService);

  constructor() {

    this.registerForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required)
    });

    merge(this.registerForm.statusChanges, this.registerForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

  }

  onSubmit() {
    this.successMessage.set('');
    this.generalErrorMessage.set('');

    const userCreationRequestDTO: UserCreationRequestDTO = {
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      email: this.registerForm.get('email')?.value,
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value
    };

    // TODO: improve error and success signaling (success now signals null as the result and error object Object
    const subscription = this.userResourceService.apiV1UserCreatePost(userCreationRequestDTO).subscribe({
      next: result => {
        this.successMessage.set(`User ${userCreationRequestDTO.username} has been successfully created: ${result}`);
      },
      error: error => {
        this.generalErrorMessage.set(`Could not create the specify user: ${error}`);
        console.log(error);
      }
    });

    this.subscriptions.push(subscription);
  }


  onDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  updateErrorMessage() {
    const emailControl = this.registerForm.get('email');

    if (emailControl?.hasError('required')) {
      this.emailErrorMessage.set('You must enter an email address');
    } else if (emailControl?.hasError('email')) {
      this.emailErrorMessage.set('You must enter a valid email address');
    } else {
      this.emailErrorMessage.set('');
    }
  }

}
