import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PasswordRecoveryComponent } from './password-recovery.component';
import { ApiModule } from "../../openapi";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule,
    RouterModule.forChild([
      { path: '', component: PasswordRecoveryComponent }
    ])
  ]
})
export class PasswordRecoveryModule {

}
