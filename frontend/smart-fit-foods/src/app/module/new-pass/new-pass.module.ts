import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPassComponent } from './new-pass.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [NewPassComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class NewPassModule { }
