import { Injectable } from '@angular/core';
import {Recipe} from "../../model/recipe/Recipe";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  listRecipe:Recipe[]=[];
   headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  };
  URL="http://localhost:8080/recipe";
  constructor(private httpClient: HttpClient) {

  }
  addMenu(recipeDTO){

    return this.httpClient.post(`${this.URL}/add`,recipeDTO,{headers:this.headers});
  }
  getMenu(listRecipeDetailDTO){
    return this.httpClient.post<Recipe[]>(`${this.URL}/menu`,listRecipeDetailDTO,{headers:this.headers});
  }
  gerRecipes(){
    return this.httpClient.get<Recipe[]>(`${this.URL}`,{headers:this.headers});
  }
  setListRecipe(recipe: Recipe[]){
    this.listRecipe = recipe;
  }
  getListRecipe(){
    return this.listRecipe;
  }
  getRecipeSearch(name:string){
    return this.httpClient.get<Recipe[]>(`${this.URL}/searchRecipe?name=${name}`,{headers:this.headers});
  }

}
