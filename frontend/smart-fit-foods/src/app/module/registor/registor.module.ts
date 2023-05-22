import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistorModuleComponent } from './registor-module.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [RegistorModuleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class RegistorModule { }
