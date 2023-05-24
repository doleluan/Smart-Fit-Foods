import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-post-admin',
  templateUrl: './add-post-admin.component.html',
  styleUrls: ['./add-post-admin.component.css']
})
export class AddPostAdminComponent implements OnInit {
  formGroup: any;
  recipes: any;
  url = 'assets/js/scripts/jquery.js';
  loadAPI: any;
  constructor() { }

  ngOnInit(): void {
    this.loadAPI = new Promise(resolve => {
      this.loadScript();
    });
  }
  public loadScript() {
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  addFile($event: Event) {

  }

  addnewPost() {

  }
}
