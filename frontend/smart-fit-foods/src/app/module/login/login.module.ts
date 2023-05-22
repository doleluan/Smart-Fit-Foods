import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModuleComponent } from './login-module.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [LoginModuleComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
