import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/person/user.service";
import {Router} from "@angular/router";
import {AccountDTO} from "../../dto/AccountDTO";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.css']
})
export class NewPassComponent implements OnInit {
  formNewPass: FormGroup
  errorMessage: string;
  constructor(private userService: UserService,private formBuilder: FormBuilder,private router: Router,private toastrService:ToastrService) { }
  ngOnInit(): void {
    this.buidForm();
  }
  buidForm(){
    this.formNewPass = this.formBuilder.group({
      code:['',Validators.required],
      password:['',Validators.minLength(6)],
      confirmPassword:['',Validators.required]
    },{ validator: this.passwordMatchValidator })
  }

  getNewPass() {
    let accountDTO: AccountDTO = new AccountDTO();
    accountDTO.username = localStorage.getItem('username');
    accountDTO.newPass = this.formNewPass.value.password;
    accountDTO.code = this.formNewPass.value.code;
    this.userService.getNewPass(accountDTO).subscribe(data=>{
      localStorage.removeItem('username');
      this.toastrService.success("Cập nhật mật khẩu thành công");
      this.router.navigate(['/login']);
    },error => {
      this.errorMessage="Tài khoản không tồn tại"
    })
  }

  changingValueUsername() {
    this.errorMessage ="";
  }
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password.pristine || confirmPassword.pristine) {
      return null;
    }
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'mismatch': true } : null;
  }
}
