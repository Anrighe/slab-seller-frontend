import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PasswordRecoveryResetComponent } from './password-recovery-reset.component';
import { ApiModule } from "../../../openapi";
import {PasswordRecoveryResetGuard} from "./password-recovery-reset.guard";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule,
    RouterModule.forChild([
      {
        path: ':token',
        component: PasswordRecoveryResetComponent,
        canActivate: [PasswordRecoveryResetGuard]
      }
    ])
  ],
  providers: [PasswordRecoveryResetGuard]
})
export class PasswordRecoveryResetModule {

}
