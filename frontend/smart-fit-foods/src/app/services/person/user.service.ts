import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {UserDTO} from "../../dto/UserDTO";
import {UserEditDTO} from "../../dto/UserEditDTO";
import {AccountDTO} from "../../dto/AccountDTO";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL="http://localhost:8080";
   headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  };
  constructor(private httpClient: HttpClient) { }
  registor(user){
    console.log(user);
    return this.httpClient.post(`${this.URL}/registration`,user)
  }
  login(user){
    return this.httpClient.post<token>(`${this.URL}/login`,user)
  }
  getUserCurrent(){
    return this.httpClient.get<UserDTO>(`${this.URL}/getUserInfor`,{headers:this.headers});
  }
  editUser(userDTO: UserEditDTO){
    return this.httpClient.put<UserDTO>(`${this.URL}/edit`,userDTO,{headers:this.headers});
  }
  changePasswoord(accountDTO){
    return this.httpClient.put(`${this.URL}/changePass`,accountDTO,{headers:this.headers});
  }
  forgotPass(accountDTO: AccountDTO){
    return this.httpClient.post(`${this.URL}/forgotPass`,accountDTO)
  }
  getNewPass(accountDTO: AccountDTO){
    return this.httpClient.post(`${this.URL}/getNewPass`,accountDTO)
  }

}
export interface token {
  token?:string
}
