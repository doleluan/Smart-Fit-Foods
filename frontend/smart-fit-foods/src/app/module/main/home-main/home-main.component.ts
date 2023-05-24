import {Component, ElementRef, OnInit} from '@angular/core';
import {Post} from "../../../model/post/Post";
import {Router} from "@angular/router";
import {PostService} from "../../../services/post/post.service";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {
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

  constructor(private router: Router,private elRef: ElementRef,private postService: PostService,private recipeService: RecipeService,
              private toastrService: ToastrService) { }
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
  getNewPost(){
    return this.postService.newPost().subscribe(data=>{
      this.post = data;
    })
  }

  searchRecipes(value) {
    this.recipeService.getRecipeSearch(value).subscribe(data=>{
      if (data.length==0){
        this.toastrService.error(`Không có món ăn nào theo tên ${value}`);
      }else {
        sessionStorage.setItem('listRecipes',JSON.stringify(data));
        this.router.navigate(['/listRecipe']);
      }
    })
  }

  getDetailPost(item: Post) {
    console.log(item)
    localStorage.setItem('post',JSON.stringify(item));
    this.router.navigate(['viewPost'])
  }
}
