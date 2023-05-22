import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { UserComponent } from './user/user.component';
import {RouterModule} from "@angular/router";
import { DashBoardComponent } from './dash-board/dash-board.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AmdinHeaderComponent } from './amdin-header/amdin-header.component';



@NgModule({
  declarations: [AdminComponent, EmployeeComponent, UserComponent, DashBoardComponent, SidebarComponent, AmdinHeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AdminModule { }
