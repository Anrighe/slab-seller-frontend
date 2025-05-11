import { Component, inject, signal } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatDialogContent } from "@angular/material/dialog";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { merge, Subscription } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
  EmailResourceService,
  PasswordRecoveryRequestDTO,
  PasswordRecoveryUpdateRequestDTO,
  UserResourceService
} from "../../../openapi";

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

  protected token: string | null = '';

  private MINIMUM_PASSWORD_LENGTH: number = 8;
  private MAXIMUM_PASSWORD_LENGTH: number = 50;

  protected passwordResetForm: FormGroup;
  private subscriptions: Subscription[] = [];

  protected showPassword = false;
  protected showRepeatedPassword = false;

  protected passwordRecoveryRequestEmail : string = '';

  protected passwordErrorMessage = signal('');
  protected repeatedPasswordErrorMessage = signal('');
  protected generalErrorMessage = signal('');
  protected successMessage = signal('');

  private router: Router = inject(Router);
  private emailResourceService: EmailResourceService = inject(EmailResourceService);
  private userResourceService: UserResourceService = inject(UserResourceService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {

    this.passwordResetForm = new FormGroup({
      'password': new FormControl('', [Validators.required, Validators.minLength(this.MINIMUM_PASSWORD_LENGTH), Validators.maxLength(this.MAXIMUM_PASSWORD_LENGTH)]),
      'repeatedpassword': new FormControl('', [Validators.required, Validators.minLength(this.MINIMUM_PASSWORD_LENGTH), Validators.maxLength(this.MAXIMUM_PASSWORD_LENGTH)])
    });

    merge(this.passwordResetForm.statusChanges, this.passwordResetForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    this.token = this.route.snapshot.paramMap.get('token');

    if (this.token) {

      const subscription = this.userResourceService.apiV1UserPasswordrecoveryEmailRequestHashGet(this.token).subscribe({
        next: (result: any) => {
          this.passwordRecoveryRequestEmail = result.email;
        },
        error: err => {
          console.log(err);
        }
      });

      this.subscriptions.push(subscription);
    }
  }

  onSubmit() {
    if (this.token && this.passwordRecoveryRequestEmail) {

      const passwordRecoveryUpdateRequestDTO: PasswordRecoveryUpdateRequestDTO = {
        passwordRecoveryRequestHashedId: this.token,
        passwordRecoveryEmail: this.passwordRecoveryRequestEmail,
        newPassword: this.passwordResetForm.get('password')?.value,
        confirmPassword: this.passwordResetForm.get('repeatedpassword')?.value
      };
      this.userResourceService.apiV1UserPasswordrecoveryUpdatePost(passwordRecoveryUpdateRequestDTO).subscribe({
        next: () => {
          this.router.navigate(['login']);
        },
        error: err => {
          console.log(err);
        }
      })
    }
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
