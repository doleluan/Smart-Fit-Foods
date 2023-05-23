package com.example.backend.services;

import com.example.backend.dto.RecipeDTO;
import com.example.backend.dto.RecipeIDetailDTO;
import com.example.backend.model.food.FoodDetail;
import com.example.backend.model.recipe.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IRecipeServices {
    List<Recipe> findAll();
    List<Recipe> findMenu(RecipeIDetailDTO[] recipeIDetailDTOS);
    void addRecipe(RecipeDTO recipeDTO);
    Recipe findById(Integer id);
    Page<Recipe> findAll(String name, Pageable pageable);
    List<Recipe> searchRecipe(String name);
}
