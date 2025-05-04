import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PasswordRecoveryComponent } from './password-recovery.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: PasswordRecoveryComponent },
      {
        path: 'reset',
        loadChildren: () =>
          import('./password-recovery-reset/password-recovery-reset.module').then(m => m.PasswordRecoveryResetModule)
      }
    ])
  ]
})
export class PasswordRecoveryModule {

}
