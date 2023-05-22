import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPassComponent } from './forgot-pass.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [ForgotPassComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class ForgotPassModule { }
