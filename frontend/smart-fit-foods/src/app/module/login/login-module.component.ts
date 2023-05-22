import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../services/person/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-module',
  templateUrl: './login-module.component.html',
  styleUrls: ['./login-module.component.css']
})
export class LoginModuleComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string;
  constructor(private userService: UserService,private formBuilder: FormBuilder,private router: Router) { }
  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate([""]);
    }
    this.buidForm();
  }
  buidForm(){
    this.formGroup = this.formBuilder.group({
      username:[''],
      password:[''],
    })
  }
  login() {
    this.userService.login(this.formGroup.value).subscribe(data=>{
        localStorage.setItem('token',data.token);
        this.router.navigate([""]);
      },error => {
        this.errorMessage="Thông tin tài khoản hoặc mật khẩu không chính xác"
      }
    )
  }
}
