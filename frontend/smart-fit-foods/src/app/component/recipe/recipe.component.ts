import { Component, OnInit } from '@angular/core';
import {FoodDetail} from "../../model/food/FoodDetail";
import {FoodDetailService} from "../../services/food/food-detail.service";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeDTO} from "../../dto/RecipeDTO";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {RecipeDetailDTO} from "../../dto/RecipeDetailDTO";
import {RecipeService} from "../../services/recipe/recipe.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  food_detail:FoodDetail[]=[];
  formGroup : FormGroup;
  fileChoose: File;
  filesChoose:File;
  videoChoose: File;
  formArrayImg: FormArray;
  constructor(private foodDetailService: FoodDetailService,private formBuilder: FormBuilder,private fireStorage : AngularFireStorage,
              private recipeService: RecipeService,private route : Router,private toarsrt: ToastrService
              ) { }
  ngOnInit(): void {
    this.getFoodDetail();
    this.buildForm();

  }
  buildForm(){
  this.formGroup = this.formBuilder.group({
    name:['',[Validators.required]],
    content:['',[Validators.required]],
    videos:['',[Validators.required]],
    advantage:['',[Validators.required]],
    defect:['',[Validators.required]],
    steps:['',[Validators.required]],
    formArray: this.formBuilder.array([])
  });
    this.addFormControl();
    this.formArrayImg = this.formBuilder.array([])
    this.addPicture();
  }
  getFoodDetail(){
    this.foodDetailService.getAll().subscribe(
      data=>{
        this.food_detail = data;
      }
    )
  }
  addFormControl(){
    const formArray = this.formGroup.get('formArray') as FormArray;
    formArray.push(
      this.formBuilder.group({
        food_detail_id: new FormControl('',Validators.required),
        quantity: new FormControl('',[Validators.pattern("^\\d{0,}$"),this.validThan0])
      })
    );
  }
  get formArray(): FormArray {
    return this.formGroup.get('formArray') as FormArray;
  }
  async submitFood() {
    // const imgsPath = `recipes/${Date.now()}${this.fileChoose.name}`;
    // const videosPath = `recipes/${Date.now()}${this.videoChoose.name}`;
    // // Tạo reference để lưu trữ ảnh trên Firebase Storage
    // const imgsRef = this.fireStorage.ref(imgsPath)
    // const videosRef = this.fireStorage.ref(videosPath);
    // try {
    //   // Tải lên ảnh lên Firebase Storage và lấy downloadURL để hiển thị trên giao diện
    //   const imgUploadTask = this.fireStorage.upload(imgsPath, this.fileChoose);
    //   const imgSnapshot = await imgUploadTask.snapshotChanges().toPromise();
    //   const imgUrl = await imgsRef.getDownloadURL().toPromise();
    //   const videoUploadTask = this.fireStorage.upload(videosPath, this.videoChoose);
    //   const videoSnapshot = await videoUploadTask.snapshotChanges().toPromise();
    //   const videoUrl = await videosRef.getDownloadURL().toPromise();
    //   this.formGroup.value.imgs = imgUrl;
    //   this.formGroup.value.videos = videoUrl;
    //   let recipeDetailDTO = this.convertRecipeDTO(this.formGroup.value);
    //   this.recipeService.addMenu(recipeDetailDTO).subscribe(data=>{
    //         this.route.navigate(['/food']);
    //         this.toarsrt.success(`Thêm mới công thức ${recipeDetailDTO.name}`,"Thành công")
    //   })
    // }catch (e) {
    //   console.log(e)
    // }
    console.log(this.formGroup.value);
    console.log(this.formArray.controls[0].value)
  }
  convertRecipeDTO(value){
    const recipeDTO = new RecipeDTO();
    recipeDTO.name = value.name;
    recipeDTO.content = value.content;
    recipeDTO.food_detail = this.formGroup.value.formArray;
    recipeDTO.advantage = this.formGroup.value.advantage;
    recipeDTO.defect = this.formGroup.value.defect;
    recipeDTO.steps = this.formGroup.value.steps;
    return recipeDTO;
  }

  addFile(event) {
    this.fileChoose = event.target.files[0];
    let idImg = document.getElementById("recipes-imgs-firebase") as HTMLImageElement;
    let reader = new  FileReader();
    reader.readAsDataURL(this.fileChoose)
    reader.onload = function() {
      idImg.src = reader.result as string;
    }
  }
  uploadVideo(event) {
    this.videoChoose = event.target.files[0];
    let idImg = document.getElementById("videoUpload") as HTMLImageElement;
    let reader = new  FileReader();
    reader.readAsDataURL(this.videoChoose)
    reader.onload = function() {
      idImg.src = reader.result as string;
    }
  }
  validThan0(c:AbstractControl) {
    const v = c.value;
    if (v <= 0) {
      return {
        "validMoreThan0": true
      }
    }
    return null;
  }
  addPicture() {
    if (this.formArrayImg.length < 4) {
      this.formArrayImg.push(new FormControl("", Validators.required));
    }
  }

  uploadImg(event, i: number) {
    const fileName = event.target.files[0];
    if (fileName){
      this.formArrayImg.controls[i].patchValue({"file": fileName});
      let idImg = document.getElementById(`label-img${i}`) as HTMLImageElement;
      let reader = new FileReader();
      reader.readAsDataURL(fileName)
      reader.onload = function() {
        idImg.src = reader.result as string;
      }
    }
  }
  async addRecipe() {
    let src = "";
    for (let [index,file] of this.formArrayImg.controls.entries()) {
      if (file.value!=null){
        if (file.value.file.type != 'image/png' && file.value.file.type != 'image/jpeg') {
        } else {
          let filePath = `recipe-imgs/${new Date().toISOString()}${file.value.file.name}`
          let fileRef = this.fireStorage.ref(filePath);
          await this.fireStorage.upload(filePath, file.value.file).snapshotChanges().toPromise();
          const url = await fileRef.getDownloadURL().toPromise();
          src+=`${url}capstone2Sff`;
        }
      }
      continue;
    }
    const videosPath = `recipeid/${Date.now()}${this.videoChoose.name}`;
    const videosRef = this.fireStorage.ref(videosPath);
    const videoUploadTask = this.fireStorage.upload(videosPath, this.videoChoose);
    const videoSnapshot = await videoUploadTask.snapshotChanges().toPromise();
    const videoUrl = await videosRef.getDownloadURL().toPromise();
    let recipeDetailDTO = this.convertRecipeDTO(this.formGroup.value);
    recipeDetailDTO.imgs = src.replace(/capstone2Sff$/, '');
    recipeDetailDTO.videos = videoUrl;
    this.recipeService.addMenu(recipeDetailDTO).subscribe(data=>{
              this.toarsrt.success(`Thêm mới công thức ${recipeDetailDTO.name}`,"Thành công");
              this.formGroup.reset();
              this.formArrayImg.reset();
              this.formArray.reset();
        })
  }
}
