import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/person/User";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  URL="http://localhost:8080/admin";
  constructor(private httpClient: HttpClient) { }
  headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  };
  getAllUser(username,address,phone_number,name,page){
    return this.httpClient.get<ListUser>(`${this.URL}/users?page=${page}&username=${username}&address=${address}&phone_number=${phone_number}`,{headers:this.headers})
  }
  getAllEmployees(username,address,phone_number,name,page){
    return this.httpClient.get<ListUser>(`${this.URL}/employees?page=${page}&username=${username}&address=${address}&phone_number=${phone_number}`,{headers:this.headers})
  }
  deleteUser(username: string){
    return this.httpClient.delete(`${this.URL}/deleteUser?username=${username}`,{headers:this.headers});
  }
  deleteEmployee(username: string){
    return this.httpClient.delete(`${this.URL}/deleteEmployee?username=${username}`,{headers:this.headers});
  }
}
export interface ListUser {
  content:User[];
  totalPages:number;
  number:number;
}
