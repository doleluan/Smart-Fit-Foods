import { Injectable } from '@angular/core';
import {CommentDTO} from "../../dto/CommentDTO";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  URL="http://localhost:8080/comment";
  constructor(private httpClient:HttpClient) { }

  addComment(comment:CommentDTO){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    };
    return this.httpClient.post(`${this.URL}/add`,comment,{headers:headers})
  }
}
