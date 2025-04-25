import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { ApiModule } from "../../openapi";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule,
    RouterModule.forChild([
      { path: '', component: RegisterComponent }
    ])
  ]
})
export class LoginModule {

}
