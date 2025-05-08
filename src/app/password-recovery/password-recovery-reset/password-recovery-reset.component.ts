import { Component, inject, signal } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatDialogContent } from "@angular/material/dialog";
import { Router, RouterLink } from "@angular/router";
import { merge, Subscription } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { EmailResourceService, PasswordRecoveryRequestDTO } from "../../../openapi";

@Component({
  selector: 'app-register',
  templateUrl: './password-recovery-reset.component.html',
  styleUrls: ['./password-recovery-reset.component.css'],
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
export class PasswordRecoveryResetComponent {

  private MINIMUM_PASSWORD_LENGTH: number = 8;
  private MAXIMUM_PASSWORD_LENGTH: number = 50;

  passwordResetForm: FormGroup;
  subscriptions: Subscription[] = [];

  showPassword = false;
  showRepeatedPassword = false;

  passwordErrorMessage = signal('');
  repeatedPasswordErrorMessage = signal('');
  generalErrorMessage = signal('');
  successMessage = signal('');

  private Router: Router = inject(Router);
  private emailResourceService: EmailResourceService = inject(EmailResourceService);

  constructor() {

    this.passwordResetForm = new FormGroup({
      'password': new FormControl('', [Validators.required, Validators.minLength(this.MINIMUM_PASSWORD_LENGTH), Validators.maxLength(this.MAXIMUM_PASSWORD_LENGTH)]),
      'repeatedpassword': new FormControl('', [Validators.required, Validators.minLength(this.MINIMUM_PASSWORD_LENGTH), Validators.maxLength(this.MAXIMUM_PASSWORD_LENGTH)])
    });

    merge(this.passwordResetForm.statusChanges, this.passwordResetForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

  }

  onSubmit() {
    //TODO: make and api with KeycloakService.updateUserPassword? - also validate the parameter on the page on the backend again once called?
  }

  onDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  updateErrorMessage() {
    const passwordControl = this.passwordResetForm.get('password');

    if (passwordControl?.hasError('required')) {
      this.passwordErrorMessage.set('You must enter a password');
    } else if (passwordControl?.hasError('minlength')) {
      this.passwordErrorMessage.set(`Password must be at least ${this.MINIMUM_PASSWORD_LENGTH} characters long`);
    } else if (passwordControl?.hasError('maxlength')) {
      this.passwordErrorMessage.set(`Password can be at most ${this.MAXIMUM_PASSWORD_LENGTH} characters long`);
    } else {
        this.passwordErrorMessage.set('');
    }

    const repeatedPasswordControl = this.passwordResetForm.get('repeatedpassword');

    if (repeatedPasswordControl?.hasError('required')) {
      this.repeatedPasswordErrorMessage.set('You must enter a password');
    } else if (repeatedPasswordControl?.hasError('minlength')) {
      this.repeatedPasswordErrorMessage.set(`Password must be at least ${this.MINIMUM_PASSWORD_LENGTH} characters long`);
    } else if (repeatedPasswordControl?.hasError('maxlength')) {
      this.repeatedPasswordErrorMessage.set(`Password can be at most ${this.MAXIMUM_PASSWORD_LENGTH} characters long`);
    } else {
      this.repeatedPasswordErrorMessage.set('');
    }
  }

}
