import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/person/user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-registor-module',
  templateUrl: './registor-module.component.html',
  styleUrls: ['./registor-module.component.css']
})
export class RegistorModuleComponent implements OnInit {

  formGroup:FormGroup;
  conflicMessage:string;
  constructor(private formBuilder:FormBuilder,private userService: UserService,private router : Router,private toastrService: ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate([""]);
    }
    this.buildForm();
  }
  buildForm(){
    this.formGroup = this.formBuilder.group({
      username:['',Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },{ validator: this.passwordMatchValidator })
  }
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password.pristine || confirmPassword.pristine) {
      return null;
    }
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'mismatch': true } : null;
  }
  registor(){
    let userRegistor: UserRegistor = new UserRegistor();
    userRegistor.username = this.formGroup.value.username;
    userRegistor.password = this.formGroup.value.password;
    this.userService.registor(this.formGroup.value).subscribe(data=>{
      this.toastrService.success("Đăng ký tài khoản thành công")
      this.router.navigate(["/login"]);
    },error => {
      this.conflicMessage="Tài khoản này đã tồn tại";
    })
  }

}
class UserRegistor{
  username: string
  password: string
  email:string
}
