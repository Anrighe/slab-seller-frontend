import {Component, inject, signal} from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatDialogContent } from "@angular/material/dialog";
import {Router, RouterLink} from "@angular/router";
import {merge, Subscription} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {PasswordRecoveryRequestDTO} from "../../openapi";

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

    /*const passwordRecoveryRequestDTO: PasswordRecoveryRequestDTO = {
      email: this.registerForm.value.email
    };

    console.log(passwordRecoveryRequestDTO);
    const subscription = this.emailResourceService.apiV1EmailPasswordrecoveryPost(passwordRecoveryRequestDTO).subscribe({
      next: () => {
        this.successMessage.set(`Password recovery email sent to ${this.passwordRecoveryForm.value.email}`);
      },
      error: (error) => {
        this.generalErrorMessage.set('Something went wrong, please try again later');
      }
    });

    this.subscriptions.push(subscription);*/
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
