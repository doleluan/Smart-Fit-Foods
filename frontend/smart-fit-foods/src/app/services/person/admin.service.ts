import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/person/User";
import {Recipe} from "../../model/recipe/Recipe";
import {Post} from "../../model/post/Post";

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
  getAllUser(username,name,page){
    return this.httpClient.get<ListUser>(`${this.URL}/users?page=${page}&username=${username}&name=${name}`,{headers:this.headers})
  }
  getAllEmployees(username,name,page){
    return this.httpClient.get<ListUser>(`${this.URL}/employees?page=${page}&username=${username}&name=${name}`,{headers:this.headers})
  }
  deleteUser(username: string){
    return this.httpClient.delete(`${this.URL}/deleteUser?username=${username}`,{headers:this.headers});
  }
  deleteEmployee(username: string){
    return this.httpClient.delete(`${this.URL}/deleteEmployee?username=${username}`,{headers:this.headers});
  }
  getAllRecipes(nameSearch: string, pageNumber: number) {
    return this.httpClient.get<ListRecipe>(`${this.URL}/listRecipe?page=${pageNumber}&name=${nameSearch}`,{headers:this.headers})
  }
}

export interface ListPost {
  content:Post[];
  totalPages:number;
  number:number;
}
export interface ListRecipe {
  content:Recipe[];
  totalPages:number;
  number:number;
}
export interface ListUser {
  content:User[];
  totalPages:number;
  number:number;
}
