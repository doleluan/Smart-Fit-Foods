import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {UserDTO} from "../../dto/UserDTO";
import {UserEditDTO} from "../../dto/UserEditDTO";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL="http://localhost:8080";
  constructor(private httpClient: HttpClient) { }
  registor(user){
    return this.httpClient.post(`${this.URL}/registration`,user)
  }
  login(user){
    return this.httpClient.post<token>(`${this.URL}/login`,user)
  }
  getUserCurrent(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    };
    return this.httpClient.get<UserDTO>(`${this.URL}/getUserInfor`,{headers:headers});
  }
  editUser(userDTO: UserEditDTO){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    };
    console.log(userDTO);
    return this.httpClient.put<UserDTO>(`${this.URL}/edit`,userDTO,{headers:headers});
  }
}
export interface token {
  token?:string
}
