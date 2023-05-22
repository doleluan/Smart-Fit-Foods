import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HealthComponent } from './component/health/health.component';
import { LifeComponent } from './component/life/life.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BlogComponent } from './component/blog/blog.component';
import { RecipeComponent } from './component/recipe/recipe.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ListRecipeComponent } from './component/list-recipe/list-recipe.component';
import {LoginModule} from "./module/login/login.module";
import {RegistorModule} from "./module/registor/registor.module";
import {MainModule} from "./module/main/main.module";
import {ForgotPassModule} from "./module/forgot-pass/forgot-pass.module";
import {AdminModule} from "./module/admin/admin.module";
import {NewPassModule} from "./module/new-pass/new-pass.module";


@NgModule({
  declarations: [
    AppComponent,
    HealthComponent,
    LifeComponent,
    BlogComponent,
    RecipeComponent,
    ListRecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    LoginModule,
    RegistorModule,
    MainModule,
    ForgotPassModule,
    AdminModule,
    ForgotPassModule,
    NewPassModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
