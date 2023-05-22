package com.example.backend.model.recipe;

import com.example.backend.dto.RecipeDTO;
import com.example.backend.dto.RecipeIDetailDTO;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String content;
    private String imgs;
    private String videos;
    private String steps;
    private String advantage;
    private String defect;
    public Recipe(RecipeDTO recipeDTO){
        this.name = recipeDTO.getName();
        this.id=null;
        this.content=recipeDTO.getContent();
        this.imgs = recipeDTO.getImgs();
        this.videos = recipeDTO.getVideos();
        this.advantage = recipeDTO.getAdvantage();
        this.steps = recipeDTO.getSteps();
        this.defect = recipeDTO.getDefect();
    }
}
