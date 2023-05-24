import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  clickUser() {
    document.getElementById("admin-nav").classList.remove('side-nav__item-active');
    document.getElementById("employee-nav").classList.remove('side-nav__item-active');
    document.getElementById("user-nav").classList.add('side-nav__item-active')
    document.getElementById("recipe-nav").classList.remove('side-nav__item-active');
    document.getElementById("addPost-nav").classList.remove('side-nav__item-active')

  }
  clickEmployee() {
    document.getElementById("admin-nav").classList.remove('side-nav__item-active');
    document.getElementById("user-nav").classList.remove('side-nav__item-active');
    document.getElementById("recipe-nav").classList.remove('side-nav__item-active');
    document.getElementById("employee-nav").classList.add('side-nav__item-active')
    document.getElementById("addPost-nav").classList.remove('side-nav__item-active')

  }
  clickAdmin() {
    document.getElementById("employee-nav").classList.remove('side-nav__item-active');
    document.getElementById("recipe-nav").classList.remove('side-nav__item-active');
    document.getElementById("user-nav").classList.remove('side-nav__item-active');
    document.getElementById("admin-nav").classList.add('side-nav__item-active')
    document.getElementById("addPost-nav").classList.remove('side-nav__item-active')

  }

  clickRecipe() {
    document.getElementById("admin-nav").classList.remove('side-nav__item-active');
    document.getElementById("employee-nav").classList.remove('side-nav__item-active');
    document.getElementById("user-nav").classList.remove('side-nav__item-active');
    document.getElementById("recipe-nav").classList.add('side-nav__item-active')
    document.getElementById("addPost-nav").classList.remove('side-nav__item-active')
  }

  clickAddPost() {
    document.getElementById("admin-nav").classList.remove('side-nav__item-active');
    document.getElementById("user-nav").classList.remove('side-nav__item-active');
    document.getElementById("recipe-nav").classList.remove('side-nav__item-active');
    document.getElementById("employee-nav").classList.remove('side-nav__item-active')
    document.getElementById("addPost-nav").classList.add('side-nav__item-active')

  }
}
