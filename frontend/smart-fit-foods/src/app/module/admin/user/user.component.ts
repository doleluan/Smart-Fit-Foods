import { Component, OnInit } from '@angular/core';
import {User} from "../../../model/person/User";
import {AdminService} from "../../../services/person/admin.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users:User[] =[];
  pageNumber: number;
  totalPages: number;
  nameSearch: string = "";
  usernameSearch: string = "";
  phone_numberSearch: string = "";
  addressSearch: string = "";
  constructor(private adminService: AdminService,private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllUsers(this.usernameSearch,this.addressSearch,this.nameSearch,this.phone_numberSearch,0);
  }
  getAllUsers(usernameSearch,addressSearch,phone_numberSearch,nameSearch,pageNumber){
    this.adminService.getAllUser(usernameSearch,addressSearch,phone_numberSearch,nameSearch,pageNumber).subscribe(data=>{
        this.users= data.content;
        if (this.users.length==0){
          this.toastrService.error("Không có người dùng nào theo kết quả tìm kiếm.");
          return;
        }
      this.pageNumber = data.number;
      this.totalPages = data.totalPages;
    })
  }
  deleteUser(){

  }

  removeUser(user: User) {
    let username = user.username.username;
    this.adminService.deleteUser(username).subscribe(data=>{
      this.getAllUsers(this.usernameSearch,this.addressSearch,this.nameSearch,this.phone_numberSearch,this.pageNumber)
    })
  }
}
