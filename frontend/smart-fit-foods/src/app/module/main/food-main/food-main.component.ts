import { Component, OnInit } from '@angular/core';
import {Food} from "../../../model/food/Food";
import {FoodDetail} from "../../../model/food/FoodDetail";
import {Post} from "../../../model/post/Post";
import {RecipeDetailDTO} from "../../../dto/RecipeDetailDTO";
import {Recipe} from "../../../model/recipe/Recipe";
import {TypeFood} from "../../../model/food/TypeFood";
import {UserDTO} from "../../../dto/UserDTO";
import {ConflicFood} from "../../../model/food/ConflicFood";
import {ChoiceFoods} from "../../../dto/ChoiceFoods";
import {PostService} from "../../../services/post/post.service";
import {FoodDetailService} from "../../../services/food/food-detail.service";
import {FoodService} from "../../../services/food/food.service";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {TypeFoodService} from "../../../services/food/type-food.service";
import {ChatGPTService} from "../../../services/chatGPT/chat-gpt.service";
import {ConflicFoodService} from "../../../services/food/conflic-food.service";

@Component({
  selector: 'app-food-main',
  templateUrl: './food-main.component.html',
  styleUrls: ['./food-main.component.css']
})
export class FoodMainComponent implements OnInit {
  food: Food[];
  foodDetail: FoodDetail[];
  idFood = 1;
  post:Post[] =[];
  title = 'smart-fit-foods';
  recipeDetailDTOS: RecipeDetailDTO[]=[];
  recipes:Recipe[]=[];
  typeFoods:TypeFood[]=[];
  quantity:number;
  user:UserDTO;
  conflicFood: ConflicFood[] = [];
  chooseTypeFood=1;
  choiceFood:ChoiceFoods[]=[];
  ngOnInit(): void {
    this.getAllFoodDetail();
    this.getAllFood();
    this.getAllTypeFood();
    this.getNewPost();
    this.getConflicFood();
  }
  constructor(private postService: PostService,private foodDetailService: FoodDetailService, private foodService : FoodService,private recipeService: RecipeService,
              private toarsrt: ToastrService,private router: Router,private typeFoodService: TypeFoodService,private chatGPTService: ChatGPTService,
              private conflicFoodService: ConflicFoodService) {
  }
  getAllFoodDetail(){
    this.foodDetailService.getAll().subscribe(data=>{
      this.foodDetail= data;
    })
  }
  getAllFood(){
    this.foodService.getAll().subscribe(data=>{
      this.food= data;
    })
  }
  getAllTypeFood(){
    return this.typeFoodService.getAll().subscribe(data=>{
      this.typeFoods = data;
    })
  }
  getChooseFood(foodDetail: FoodDetail){
    let flag = true;
    const recipeDetail = new RecipeDetailDTO();
    recipeDetail.food_detail_id = foodDetail.id;
    recipeDetail.quantity = this.quantity;
    let choiceFoods = new ChoiceFoods();
    choiceFoods.food_detail_id = foodDetail.id;
    choiceFoods.name = foodDetail.name;
    for (let item of this.recipeDetailDTOS){
      for (let conflic of this.conflicFood) {
        if (conflic.food_detail_id == item.food_detail_id && conflic.conflic_id == foodDetail.id) {
          this.toarsrt.error(`${this.getNameFoodDetail(conflic.food_detail_id)} và ${this.getNameFoodDetail(foodDetail.id)}
          có thể xung đột với nhau`)
        }
      }
      if (foodDetail.id==item.food_detail_id){
        this.toarsrt.error("Bạn không thể thêm món ăn trùng nhau","Thông báo")
        flag= false;
        break;
      }
    }
    if (flag == true){
      this.choiceFood.push(choiceFoods)
      this.recipeDetailDTOS.push(recipeDetail)
      this.chatGPTService.setMessage(choiceFoods.name);
    }
  }
  getIdFood(item: Food) {
    this.idFood=item.id;
  }

  inputQuantity(value) {
    this.quantity = parseInt(value);
  }


  createMenu() {
    this.recipeService.getMenu(this.recipeDetailDTOS).subscribe(data=>{
      this.recipes = data;
      this.recipeService.setListRecipe(this.recipes);
      this.router.navigate(['/listRecipe']);

    })
  }
  clearFoodChoose() {
    this.recipeDetailDTOS.length=0;
    this.recipes.length=0;
  }
  deleteFoodChoice(i: number) {
    this.choiceFood.splice(i,1);
    this.recipeDetailDTOS.splice(i,1);
  }
  getNewPost(){
    return this.postService.newPost().subscribe(data=>{
      this.post = data;
      this.post.length=4;
    })
  }
  getConflicFood(){
    this.conflicFoodService.getAll().subscribe(data=>{
      this.conflicFood = data;
    })
  }
  getNameFoodDetail(idFoodConflic){
    return this.foodDetail.find(function (a) {
      return a.id == idFoodConflic;
    }).name
  }
}
