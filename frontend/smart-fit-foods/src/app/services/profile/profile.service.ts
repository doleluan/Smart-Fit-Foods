import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  URL_PROVINCES="https://provinces.open-api.vn/api/?depth=3";
  constructor(private httpClient:HttpClient) {

  }
  getProvinces(){
    return this.httpClient.get<Provinces[]>(this.URL_PROVINCES);
  }
}
export interface Districts {
  name?:string
  code?:number
  codename?:string
  division_type?:string
  short_codename?:string
  wards?
}
export interface Wards {
  name?:string
  code?:number
  codename?:string
  division_type?:string
  short_codename?:string
}
export interface Provinces {
  name?:string
  code?:number
  division_type?:string
  codename?:string
  phone_code?:number
  districts?
}
