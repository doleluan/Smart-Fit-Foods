import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeaderMainComponent } from './header-main/header-main.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FooterMainComponent } from './footer-main/footer-main.component';
import { HomeMainComponent } from './home-main/home-main.component';
import { FoodMainComponent } from './food-main/food-main.component';
import { ChatComponent } from './chat/chat.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ProfileMainComponent } from './profile-main/profile-main.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { ListRecipeMainComponent } from './list-recipe-main/list-recipe-main.component';
import { ViewDetailPostComponent } from './view-detail-post/view-detail-post.component';
import { HealthyMainComponent } from './healthy-main/healthy-main.component';
import { LifeStyleComponent } from './life-style/life-style.component';



@NgModule({
  declarations: [MainComponent, HeaderMainComponent, FooterMainComponent, HomeMainComponent, FoodMainComponent, ChatComponent, ScheduleComponent, ProfileMainComponent, ViewRecipeComponent, ListRecipeMainComponent, ViewDetailPostComponent, HealthyMainComponent, LifeStyleComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class MainModule { }
