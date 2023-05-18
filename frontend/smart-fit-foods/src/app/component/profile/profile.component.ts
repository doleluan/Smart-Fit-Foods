import {Component, ElementRef, OnInit} from '@angular/core';
import {Districts, ProfileService, Provinces} from "../../services/profile/profile.service";
import {GenderService} from "../../services/person/gender.service";
import {Gender} from "../../model/person/Gender";
import {UserService} from "../../services/person/user.service";
import {UserDTO} from "../../dto/UserDTO";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserEditDTO} from "../../dto/UserEditDTO";
import {finalize} from "rxjs/operators";
import {PostDTO} from "../../dto/PostDTO";
import {AngularFireStorage} from "@angular/fire/storage";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
  constructor(private elRef: ElementRef,private profileService: ProfileService,private genderService:GenderService,
              private userService: UserService,private formBuilder: FormBuilder,private fireStorage: AngularFireStorage,
              private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProvinces();
    this.getGender();
    this.buildForm();
    this.getCurentUser();
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
      avatar: ['', [Validators.required]],
      gender:[this.userCurrent==undefined?null:this.userCurrent.gender,[Validators.required]],
      phone_number:[this.userCurrent.phone_number,Validators.required],
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
    console.log(this.provinceString + this.districString + this.wardsString);
  }

  getUserEdit(){
   let userDT0 : UserEditDTO = new UserEditDTO();
    userDT0.gender = this.formGroup.value.gender;
    userDT0.name = this.formGroup.value.name;
    userDT0.phone_number = this.formGroup.value.phone_number;
    userDT0.email=this.userCurrent.email;
    userDT0.id = this.userCurrent.id;
    userDT0.username=this.userCurrent.username;
    userDT0.address = `${this.wardsString}-${this.districString}-${this.provinceString}`;
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
      console.log(userEditDTO);
      this.userService.editUser(userEditDTO).subscribe(data=>{
        this.userCurrent = data;
        this.ngOnInit();
        this.toastrService.success("Thay đổi thông tin thành công")
      })
    }else {
      let userEditDTO : UserEditDTO = this.getUserEdit();
      userEditDTO.avatar = this.userCurrent.avatar;
      this.userService.editUser(userEditDTO).subscribe(data=>{
        this.userCurrent=data;
        this.ngOnInit();
        this.toastrService.success("Thay đổi thông tin thành công")
      })
    }

  }
}
