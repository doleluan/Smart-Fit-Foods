import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogComponent} from "./component/blog/blog.component";
import {RecipeComponent} from "./component/recipe/recipe.component";
import {AuthGuard} from "./guards/auth.guard";
import {Role} from "./model/enum/Roles";
import {LoginModuleComponent} from "./module/login/login-module.component";
import {RegistorModuleComponent} from "./module/registor/registor-module.component";
import {MainComponent} from "./module/main/main.component";
import {HomeMainComponent} from "./module/main/home-main/home-main.component";
import {FoodMainComponent} from "./module/main/food-main/food-main.component";
import {ScheduleComponent} from "./module/main/schedule/schedule.component";
import {ProfileMainComponent} from "./module/main/profile-main/profile-main.component";
import {ForgotPassComponent} from "./module/forgot-pass/forgot-pass.component";
import {AdminComponent} from "./module/admin/admin.component";
import {EmployeeComponent} from "./module/admin/employee/employee.component";
import {UserComponent} from "./module/admin/user/user.component";
import {DashBoardComponent} from "./module/admin/dash-board/dash-board.component";
import {NewPassComponent} from "./module/new-pass/new-pass.component";
import {ListRecipeMainComponent} from "./module/main/list-recipe-main/list-recipe-main.component";
import {ViewDetailPostComponent} from "./module/main/view-detail-post/view-detail-post.component";
import {AdminRecipeComponent} from "./module/admin/admin-recipe/admin-recipe.component";
import {HealthyMainComponent} from "./module/main/healthy-main/healthy-main.component";
import {LifeStyleComponent} from "./module/main/life-style/life-style.component";
import {AddPostAdminComponent} from "./module/admin/add-post-admin/add-post-admin.component";


const routes: Routes = [
  {
    path:"", component:MainComponent,
    children:[
      {
        path:"",
        component:HomeMainComponent
      },
      {
        path: "food",
        component: FoodMainComponent
      },
      {
        path: "schedule",
        component: ScheduleComponent
      },
      {
        path: "profile",
        component: ProfileMainComponent
      },
      {
        path: "listRecipe",
        component: ListRecipeMainComponent
      },
      {
        path: "viewPost",
        component: ViewDetailPostComponent
      },
      {
        path: "healthy",
        component:HealthyMainComponent
      },
      {
        path: "lifestyle",
        component: LifeStyleComponent
      }
    ]
  },
  {
    path:"login", component:LoginModuleComponent
  },
  {
    path:"registor",
    component: RegistorModuleComponent,
  },
  {
    path: "forgotPass",
    component:ForgotPassComponent
  },
  {
    path: "newPass",
    component: NewPassComponent
  },
  {
    path:"blog",
    component:BlogComponent,
    canActivate:[AuthGuard],
    data:{roles:[Role.USER,Role.ADMIN,Role.EMPLOYEE]}
  },
  {
    path:"recipes",
    component:RecipeComponent,
    canActivate:[AuthGuard],
    data:{roles:[Role.ADMIN,Role.EMPLOYEE]}
  },
  {
    path: "admin",
    canActivate:[AuthGuard],
    data:{roles:[Role.ADMIN,Role.EMPLOYEE]},
    component: AdminComponent,
    children:[
      {
        path: "employee",
        component: EmployeeComponent,
        canActivate:[AuthGuard],
        data:{roles:[Role.ADMIN]}
      },
      {
        path: "user",
        component:UserComponent,
        canActivate:[AuthGuard],
        data:{roles:[Role.ADMIN,Role.EMPLOYEE]}
      },
      {
        path: "",
        component: DashBoardComponent
      },
      {
        path: "recipe",
        component: AdminRecipeComponent
      },
      {
        path: "post",
        component: AddPostAdminComponent
      }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
