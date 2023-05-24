import { Component, OnInit } from '@angular/core';
import {User} from "../../../model/person/User";
import {AdminService} from "../../../services/person/admin.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees:User[] =[];
  pageNumber: number;
  totalPages: number;
  nameSearch: string = "";
  usernameSearch: string = "";
  constructor(private adminService: AdminService,private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllUsers(this.usernameSearch,this.nameSearch,0);
  }
  getAllUsers(usernameSearch,nameSearch,pageNumber){
    this.adminService.getAllEmployees(usernameSearch,nameSearch,pageNumber).subscribe(data=>{
      this.employees= data.content;
      if (this.employees.length==0){
        this.getAllUsers(this.usernameSearch,this.nameSearch,0);
        this.toastrService.error("Không có nhân viên nào theo kết quả tìm kiếm.");
        return;
      }
      this.pageNumber = data.number;
      this.totalPages = data.totalPages;
    })
  }
  removeUser(user: User) {
    let username = user.username.username;
    this.adminService.deleteEmployee(username).subscribe(data=>{
      this.getAllUsers(this.usernameSearch,this.nameSearch,this.pageNumber)
    })
  }

  searchUser(value: string) {
    this.adminService.getAllEmployees(value,value,0).subscribe(data=>{
      this.employees= data.content;
      if (this.employees.length==0){
        this.getAllUsers(this.usernameSearch,this.nameSearch,0);
        this.toastrService.error("Không có nhân viên nào theo kết quả tìm kiếm.");
        return;
      }
      this.pageNumber = data.number;
      this.totalPages = data.totalPages;
    })
  }
}
