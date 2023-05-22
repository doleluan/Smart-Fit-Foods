import {Component, ElementRef, OnInit} from '@angular/core';
import {Districts, ProfileService, Provinces} from "../../../services/profile/profile.service";
import {Gender} from "../../../model/person/Gender";
import {UserDTO} from "../../../dto/UserDTO";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenderService} from "../../../services/person/gender.service";
import {UserService} from "../../../services/person/user.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {ToastrService} from "ngx-toastr";
import {UserEditDTO} from "../../../dto/UserEditDTO";
import {ChangeAccountDTO} from "../../../dto/ChangeAccountDTO";

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.css']
})
export class ProfileMainComponent implements OnInit {
  provinces:Provinces[]=[];
  districtsChoice:Districts;
  provincesChoice: Provinces;
  genders:Gender[] =[];
  userCurrent:UserDTO = new UserDTO();
  fileChoose: File;
  formGroup:FormGroup;
  isChooseProvinces : boolean = false;
  isChooseDistrict: boolean = false;
  provinceString: string;
  districString: string;
  wardsString: string;
  formChangePass: FormGroup;
  constructor(private elRef: ElementRef,private profileService: ProfileService,private genderService:GenderService,
              private userService: UserService,private formBuilder: FormBuilder,private fireStorage: AngularFireStorage,
              private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProvinces();
    this.getGender();
    this.buildForm();
    this.getCurentUser();
    this.buildFormChangePass();
  }
  getItem(){
    const navItems = this.elRef.nativeElement.querySelectorAll('.nav-item a');
    navItems.forEach((item: HTMLElement) => {
      item.addEventListener('click', (event: Event) => {
        event.preventDefault();
        const activeItems = this.elRef.nativeElement.querySelectorAll('.nav-item a.active');
        activeItems.forEach((activeItem: HTMLElement) => {
          activeItem.classList.remove('active');
        });
        item.classList.add('active');
        const taikhoanEl = this.elRef.nativeElement.querySelector('#taikhoan');
        if (item.getAttribute('value') === 've') {
          taikhoanEl.style.display = 'none';
        } else {
          taikhoanEl.style.display = 'block';
        }
      });
    });
  }
  changePass(){
    const taikhoanEl = this.elRef.nativeElement.querySelector('#taikhoan');
    const matkhauEl = this.elRef.nativeElement.querySelector('#matkhau');
    taikhoanEl.style.display = 'none';
    matkhauEl.style.display = 'block';
  }
  getGender(){
    this.genderService.getAll().subscribe(data=>{
      this.genders = data;
    })
  }
  buildForm(){
    this.formGroup = this.formBuilder.group({
      name: [this.userCurrent.name, [Validators.required]],
      gender:[this.userCurrent==undefined?null:this.userCurrent.gender],
      phone_number:[this.userCurrent.phone_number,[Validators.pattern("^(84|0)\\d{9}$"),Validators.required]],
    })
  }
  getProvinces(){
    this.profileService.getProvinces().subscribe(data=>{
      this.provinces = data;
    })
  }
  handleProvinceChangeProvinces(event) {
    this.isChooseProvinces=true;
    this.provinceString = event.target.value;
    this.provincesChoice = this.provinces.find(function (e) {
      return event.target.value == e.name;
    });
  }
  handleProvinceDistricts(event) {
    this.isChooseDistrict=true;
    this.districString = event.target.value;
    this.districtsChoice = this.provincesChoice.districts.find(function (e) {
      return event.target.value == e.name;
    })
  }
  getCurentUser(){
    if(localStorage.getItem('token')){
      this.userService.getUserCurrent().subscribe(data=>{
        this.userCurrent = data;
        this.buildForm();
      })
    }
  }
  changeAvartar(event) {
    this.fileChoose = event.target.files[0];
    let idImg = document.getElementById("id-profile-avatar") as HTMLImageElement;
    let reader = new  FileReader();
    reader.readAsDataURL(this.fileChoose)
    reader.onload = function() {
      idImg.src = reader.result as string;
    }
  }

  handleWards(event) {
    this.wardsString=event.target.value;
  }

  getUserEdit(){
    let userDT0 : UserEditDTO = new UserEditDTO();
    userDT0.gender = this.formGroup.value.gender;
    userDT0.name = this.formGroup.value.name;
    userDT0.phone_number = this.formGroup.value.phone_number;
    userDT0.id = this.userCurrent.id;
    userDT0.username=this.userCurrent.username;
    userDT0.address = `${this.wardsString} - ${this.districString} - ${this.provinceString}`;
    return userDT0;
    // this.userService.editUser(userDT0).subscribe(data=>{
    //   console.log(data);
    // })
  }

  async editProfile() {
    let userEditDTO : UserEditDTO = this.getUserEdit();
    if (this.fileChoose){
      const imgPath = `avatarUser/${Date.now()}${this.fileChoose.name}`;
      // Tạo reference để lưu trữ ảnh trên Firebase Storage
      const imgsRef = this.fireStorage.ref(imgPath);
      // tải lên ảnh
      const imgUploadTask = this.fireStorage.upload(imgPath, this.fileChoose);
      // theo dõi quá trình tải lên ảnh và lấy thông tin về quá trình tải lên
      const imgSnapshot = await imgUploadTask.snapshotChanges().toPromise();
      const imgUrl = await imgsRef.getDownloadURL().toPromise();
      userEditDTO.avatar = imgUrl;
      userEditDTO.address = this.userCurrent.address;
      this.userService.editUser(userEditDTO).subscribe(data=>{
        this.userCurrent = data;
        this.ngOnInit();
        this.toastrService.success("Thay đổi thông tin thành công")
      })
    }else {
      let userEditDTO : UserEditDTO = this.getUserEdit();
      userEditDTO.avatar = this.userCurrent.avatar;
      console.log(userEditDTO )
      this.userService.editUser(userEditDTO).subscribe(data=>{
        this.userCurrent=data;
        this.ngOnInit();
        this.toastrService.success("Thay đổi thông tin thành công")
      })
    }
  }
  buildFormChangePass(){
    this.formChangePass = this.formBuilder.group({
      password:['',Validators.minLength(6)],
      newPassword:['',Validators.minLength(6)],
      confirmPassword:['',Validators.required],
    },{ validator: this.passwordMatchValidator })
  }
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    if (password.pristine || confirmPassword.pristine) {
      return null;
    }
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'mismatch': true } : null;
  }
  doChangePass(){
    let accountDTO: ChangeAccountDTO = new ChangeAccountDTO();
    accountDTO.username = this.userCurrent.username;
    accountDTO.password = this.formChangePass.value.password;
    accountDTO.newPassword = this.formChangePass.value.newPassword;
    this.userService.changePasswoord(accountDTO).subscribe(data=>{
      this.toastrService.success("Đổi mật khẩu thành công");
      this.formChangePass.reset();
    },error => {
      (document.getElementById("errorMessage") as HTMLSpanElement).textContent = "Mật khẩu không chính xác";
    })
  }
  resetPasswordMessage() {
    (document.getElementById("errorMessage") as HTMLSpanElement).textContent ="";
  }

}
