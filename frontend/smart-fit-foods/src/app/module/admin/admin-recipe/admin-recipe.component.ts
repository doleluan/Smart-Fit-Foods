import { Component, OnInit } from '@angular/core';
import {User} from "../../../model/person/User";
import {AdminService} from "../../../services/person/admin.service";
import {ToastrService} from "ngx-toastr";
import {Recipe} from "../../../model/recipe/Recipe";

@Component({
  selector: 'app-admin-recipe',
  templateUrl: './admin-recipe.component.html',
  styleUrls: ['./admin-recipe.component.css']
})
export class AdminRecipeComponent implements OnInit {
  recipes:Recipe[] =[];
  pageNumber: number;
  totalPages: number;
  nameSearch: string = "";
  constructor(private adminService: AdminService,private toastrService: ToastrService) { }
  ngOnInit(): void {
    this.getAllUsers(this.nameSearch,0);
  }
  getAllUsers(nameSearch,pageNumber){
    this.adminService.getAllRecipes(nameSearch,pageNumber).subscribe(data=>{
      this.recipes= data.content;
      if (this.recipes.length==0){
        this.toastrService.error("Không có người dùng nào theo kết quả tìm kiếm.");
        return;
      }
      this.pageNumber = data.number;
      this.totalPages = data.totalPages;
    })
  }

  removeUser(item: Recipe) {

  }

  searchRecipe(value: string) {
    this.adminService.getAllRecipes(value,0).subscribe(data=>{
      this.recipes= data.content;
      if (this.recipes.length==0){
        this.toastrService.error("Không có người dùng nào theo kết quả tìm kiếm.");
        return;
      }
      this.pageNumber = data.number;
      this.totalPages = data.totalPages;
    })
  }
}
