import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/person/user.service";
import {Router} from "@angular/router";
import {AccountDTO} from "../../dto/AccountDTO";

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  formForgotPass: FormGroup
  errorMessage: string;
  constructor(private userService: UserService,private formBuilder: FormBuilder,private router: Router) { }
  ngOnInit(): void {
    this.buidForm();
  }
  buidForm(){
    this.formForgotPass = this.formBuilder.group({
      main:['',],
      username:['',Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
    })
  }

  getNewPass() {
    let accountDTO: AccountDTO = new AccountDTO();
    accountDTO.username = this.formForgotPass.value.username;
    this.userService.forgotPass(accountDTO).subscribe(data=>{
      localStorage.setItem("username",accountDTO.username);
      console.log("ok")
      this.router.navigate(["/newPass"]);
    },error => {
      this.errorMessage="Tài khoản không tồn tại"
    })
  }

  changingValueUsername() {
    this.errorMessage ="";
  }
}
