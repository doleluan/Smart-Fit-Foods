import {Component, ElementRef, OnInit} from '@angular/core';
import {Districts, ProfileService, Provinces} from "../../services/profile/profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   provinces:Provinces[]=[];
   districtsChoice:Districts;
   provincesChoice: Provinces;
  constructor(private elRef: ElementRef,private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getProvinces();
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
  getProvinces(){
    this.profileService.getProvinces().subscribe(data=>{
      this.provinces = data;
      console.log(this.provinces)
    })
  }
  handleProvinceChangeProvinces(event) {
    this.provincesChoice = this.provinces.find(function (e) {
      return event.target.value == e.name;
    });
  }
  handleProvinceDistricts(event) {
    this.districtsChoice = this.provincesChoice.districts.find(function (e) {
      return event.target.value == e.name;
    })

  }
}
