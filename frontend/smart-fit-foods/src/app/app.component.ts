import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ChatGPTService} from "./services/chatGPT/chat-gpt.service";
import {UserDTO} from "./dto/UserDTO";
import {UserService} from "./services/person/user.service";
import {HttpEvent} from "@angular/common/http";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'smart-fit-foods';
  url = 'assets/js/scripts/jquery.js';
  loadAPI: any;
  currentDateTime: string;
  isDropDownMenuOpen: boolean = false;
  constructor(private renderer: Renderer2,private elRef: ElementRef,private chatGPTService: ChatGPTService,private userService: UserService,
              private router: Router,private localLocation : Location) {
     let now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    this.currentDateTime = now.toLocaleDateString('en-US', options);

  }
  ngOnInit(): void {
  }


}
