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
import { EmailResourceService, PasswordRecoveryRequestDTO } from "../../openapi";

@Component({
  selector: 'app-register',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css'],
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
export class PasswordRecoveryComponent {

  passwordRecoveryForm: FormGroup;
  subscriptions: Subscription[] = [];

  emailErrorMessage = signal('');
  generalErrorMessage = signal('');
  successMessage = signal('');

  private Router: Router = inject(Router);
  private emailResourceService: EmailResourceService = inject(EmailResourceService);

  constructor() {

    this.passwordRecoveryForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email])
    });

    merge(this.passwordRecoveryForm.statusChanges, this.passwordRecoveryForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  onSubmit() {
    this.successMessage.set('');
    this.generalErrorMessage.set('');

    const passwordRecoveryRequestDTO: PasswordRecoveryRequestDTO = {
      email: this.passwordRecoveryForm.value.email
    };

    console.log(passwordRecoveryRequestDTO);
    const subscription = this.emailResourceService.apiV1EmailSendPost(passwordRecoveryRequestDTO).subscribe({
      next: () => {
        this.successMessage.set(`Password recovery email sent to ${this.passwordRecoveryForm.value.email}`);
      },
      error: () => {
        this.generalErrorMessage.set('Something went wrong, please try again later');
      }
    });

    this.subscriptions.push(subscription);
  }

  onDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  updateErrorMessage() {
    const emailControl = this.passwordRecoveryForm.get('email');

    if (emailControl?.hasError('required')) {
      this.emailErrorMessage.set('You must enter an email address');
    } else if (emailControl?.hasError('email')) {
      this.emailErrorMessage.set('You must enter a valid email address');
    } else {
        this.emailErrorMessage.set('');
    }
  }

}
