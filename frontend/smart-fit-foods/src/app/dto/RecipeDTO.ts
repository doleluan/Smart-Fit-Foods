import {RecipeDetailDTO} from "./RecipeDetailDTO";

export class RecipeDTO {
  food_detail?: RecipeDetailDTO[];
  name?:string;
  content?:string;
  ingredient?:string;
  steps?:string;
  defect?:string;
  advantage?:string;
  videos?:string;
  imgs?:string;

}
