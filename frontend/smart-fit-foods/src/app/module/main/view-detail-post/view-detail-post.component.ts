import { Component, OnInit } from '@angular/core';
import {Post} from "../../../model/post/Post";
import {CommentDTO} from "../../../dto/CommentDTO";
import {CommentService} from "../../../services/post/comment.service";
import {UserDTO} from "../../../dto/UserDTO";
import {UserService} from "../../../services/person/user.service";
import {PostService} from "../../../services/post/post.service";

@Component({
  selector: 'app-view-detail-post',
  templateUrl: './view-detail-post.component.html',
  styleUrls: ['./view-detail-post.component.css']
})
export class ViewDetailPostComponent implements OnInit {
  post:Post= new Post();
  user: UserDTO;
  constructor(private commentService: CommentService,private userService:UserService,private postService:PostService) { }

  ngOnInit(): void {
    this.getUserCurrent();
    this.post= JSON.parse(localStorage.getItem('post'));
    console.log(this.post);
  }
  getUserCurrent(){
    return this.userService.getUserCurrent().subscribe(data=>{
      this.user = data;
    })
  }
  addComment(value: string, id: any) {
    (document.getElementById(`commentId`) as HTMLInputElement).value =""
    let comment: CommentDTO = new CommentDTO();
    comment.content = value;
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month starts from 0
    const year = date.getFullYear();
    const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;
    comment.time = formattedDate;
    comment.post = id;
    comment.user = this.user.id;
    return this.commentService.addComment(comment).subscribe(data=>{
        this.getCurrentPost(this.post.id);
    })
  }
  getCurrentPost(id){
    return this.postService.getPostById(id).subscribe(data=>{
      this.post = data;
      localStorage.setItem('post',JSON.stringify(this.post));
    })
  }
}
