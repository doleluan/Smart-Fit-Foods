import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {FoodComponent} from "./component/food/food.component";
import {HomeComponent} from "./component/home/home.component";
import {HealthComponent} from "./component/health/health.component";
import {LifeComponent} from "./component/life/life.component";
import {RegistorComponent} from "./component/registor/registor.component";
import {BlogComponent} from "./component/blog/blog.component";
import {RecipeComponent} from "./component/recipe/recipe.component";
import {ListRecipeComponent} from "./component/list-recipe/list-recipe.component";
import {ScheduleComponent} from "./component/schedule/schedule.component";
import {AuthGuard} from "./guards/auth.guard";
import {Role} from "./model/enum/Roles";
import {ProfileComponent} from "./component/profile/profile.component";
import {AdminComponent} from "./component/admin/admin.component";

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"login", component:LoginComponent
  },
  {
    path: "food",component:FoodComponent,
    canActivate:[AuthGuard],
    data:{roles:[Role.USER,Role.ADMIN,Role.EMPLOYEE]}
  },
  {
    path: "health",
    component: HealthComponent,
    canActivate:[AuthGuard],
    data:{roles:[Role.USER,Role.ADMIN,Role.EMPLOYEE]}
  },
  {
    path: "life",
    component: LifeComponent,
    canActivate:[AuthGuard],
    data:{roles:[Role.USER,Role.ADMIN,Role.EMPLOYEE]}
  },
  {
    path:"registor",
    component: RegistorComponent,
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
    path: "list",
    component: ListRecipeComponent,
    canActivate:[AuthGuard],
    data:{roles:[Role.USER,Role.ADMIN,Role.EMPLOYEE]}
  },
  {
    path: "list/:recipes",
    component: ListRecipeComponent,
    canActivate:[AuthGuard],
    data:{roles:[Role.ADMIN]}
  },
  {
    path: "schedule",
    component: ScheduleComponent,
    canActivate:[AuthGuard],
    data:{roles:[Role.USER,Role.ADMIN,Role.EMPLOYEE]}
  },
  {
    path: "profile",
    component:ProfileComponent,
    canActivate:[AuthGuard],
    data:{roles:[Role.USER,Role.ADMIN,Role.EMPLOYEE]}
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data:{roles:[Role.USER,Role.ADMIN,Role.EMPLOYEE]}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
