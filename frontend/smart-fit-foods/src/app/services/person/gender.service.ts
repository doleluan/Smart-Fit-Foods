import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../model/post/Post";
import {Gender} from "../../model/person/Gender";

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  URL="http://localhost:8080/gender";
  constructor(private httpClient: HttpClient) { }
  headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  };
  getAll(){
    return this.httpClient.get<Gender[]>(`${this.URL}`,{headers:this.headers})
  }
}
