import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Recipe} from "../../../model/recipe/Recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";

@Component({
  selector: 'app-list-recipe-main',
  templateUrl: './list-recipe-main.component.html',
  styleUrls: ['./list-recipe-main.component.css']
})
export class ListRecipeMainComponent implements OnInit {

  constructor(private router: Router,private recipeService: RecipeService) { }
  recipes:Recipe[]=[];
  recipe: Recipe;
  ngOnInit(): void {
    this.recipes = JSON.parse(sessionStorage.getItem('listRecipes'));
    if (sessionStorage.getItem('recipe')){
      this.recipe = JSON.parse(sessionStorage.getItem('recipe'));
    }else {
      this.recipe = this.recipes[0];
    }
  }
  getRecipe(item: Recipe) {
    this.recipe = item;
    let idVideos = document.getElementById("videoRecipes") as HTMLVideoElement;
    idVideos.load();
  }
}
