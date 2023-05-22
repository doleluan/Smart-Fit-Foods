import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Food} from "../../model/food/Food";
import {Post} from "../../model/post/Post";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  URL="http://localhost:8080/post";
   headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  };
  constructor(private httpClient: HttpClient) { }
  getAll(){
    return this.httpClient.get<Post[]>(`${this.URL}`,{headers:this.headers})
  }
  addPost(post){
    return this.httpClient.post(`${this.URL}/add`,post,{headers:this.headers})
  }
  newPost(){
    return this.httpClient.get<Post[]>(`${this.URL}/newPost`)
  }
}
