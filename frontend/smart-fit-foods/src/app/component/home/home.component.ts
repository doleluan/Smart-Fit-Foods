import {Component, ElementRef, OnInit} from '@angular/core';
import {UserDTO} from "../../dto/UserDTO";
import {Router} from "@angular/router";
import {PostService} from "../../services/post/post.service";
import {Post} from "../../model/post/Post";
import {Location} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  url = 'assets/js/scripts/jquery.js';
  loadAPI: any;
  post: Post[] =[];
  public loadScript() {
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  constructor(private router: Router,private elRef: ElementRef,private postService: PostService) { }
  ngOnInit(): void {
    // this.loadAPI = new Promise(resolve => {
    //   this.loadScript();
    // });
    this.getNewPost();
    if (!localStorage.getItem('token')){
      this.router.navigate(['/login'])
    }
    // this.loadChatGPT()
  }
    loadChatGPT(){
      const iconChatbotEl = this.elRef.nativeElement.querySelector('.icon-chatbot');
      const chatbotContainerEl = this.elRef.nativeElement.querySelector('.chatbot-container');

      iconChatbotEl.addEventListener('click', () => {
        if (window.getComputedStyle(chatbotContainerEl).getPropertyValue('opacity') === '0') {
          chatbotContainerEl.style.animation = 'show 0.5s ease-in-out forwards';
        } else {
          chatbotContainerEl.style.animation = 'hide 0.5s ease-in-out forwards';
        }
      });
      const closeChatEl = this.elRef.nativeElement.querySelector('.close-chat');
      const avatarEl = this.elRef.nativeElement.querySelector('.avatar');
      const dropDownMenuEl = this.elRef.nativeElement.querySelector('.drop-down-menu');

      closeChatEl.addEventListener('click', () => {
        this.elRef.nativeElement.querySelector('.chatbot-container').style.animation = 'hide 0.5s ease-in-out forwards';
      });

      avatarEl.addEventListener('click', () => {
        dropDownMenuEl.slideToggle();
      });
    }
    getNewPost(){
    return this.postService.newPost().subscribe(data=>{
      this.post = data;
    })
    }
}
