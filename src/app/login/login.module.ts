import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { ApiModule } from "../../openapi";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent }
    ])
  ]
})
export class LoginModule { 
  
}
