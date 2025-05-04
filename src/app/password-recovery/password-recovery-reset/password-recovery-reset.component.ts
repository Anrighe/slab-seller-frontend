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

  passwordResetForm: FormGroup;
  subscriptions: Subscription[] = [];

  emailErrorMessage = signal('');
  generalErrorMessage = signal('');
  successMessage = signal('');

  private Router: Router = inject(Router);
  private emailResourceService: EmailResourceService = inject(EmailResourceService);

  constructor() {

    this.passwordResetForm = new FormGroup({
      'password': new FormControl('', [Validators.required, Validators.min(8)]),
      'repeatedpassword': new FormControl('', [Validators.required, Validators.min(8)])
    });

    merge(this.passwordResetForm.statusChanges, this.passwordResetForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  onSubmit() {

  }

  onDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  updateErrorMessage() {
    const emailControl = this.passwordResetForm.get('email');

    if (emailControl?.hasError('required')) {
      this.emailErrorMessage.set('You must enter an email address');
    } else if (emailControl?.hasError('email')) {
      this.emailErrorMessage.set('You must enter a valid email address');
    } else {
        this.emailErrorMessage.set('');
    }
  }

}
