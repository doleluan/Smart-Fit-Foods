package com.example.backend.controller;

import com.example.backend.dto.RecipeDTO;
import com.example.backend.dto.RecipeIDetailDTO;
import com.example.backend.model.recipe.Recipe;
import com.example.backend.services.IRecipeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/recipe")
@CrossOrigin("http://localhost:4200/")
public class RecipeRestController {
    @Autowired
    private IRecipeServices iRecipeServices;
    @GetMapping("")
    private ResponseEntity<List<Recipe>> findAll(){
        return new ResponseEntity<>(this.iRecipeServices.findAll(), HttpStatus.OK);
    }
    @PostMapping("menu")
    private ResponseEntity<List<Recipe>> getRecipe(@RequestBody RecipeIDetailDTO[] recipeIDetailDTOS){
        return new ResponseEntity<>(this.iRecipeServices.findMenu(recipeIDetailDTOS), HttpStatus.OK);
    }
    @PostMapping("add")
    private ResponseEntity<?>addNewRecipe(@RequestBody RecipeDTO recipeDTO){
        try{
            this.iRecipeServices.addRecipe(recipeDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/searchRecipe")
    private ResponseEntity<List<Recipe>> searchRecipe(@RequestParam(name = "name") String name){
        return new ResponseEntity<>(this.iRecipeServices.searchRecipe(name),HttpStatus.OK);
    }
    @GetMapping("/getRecipe/{id}")
    private ResponseEntity<Recipe> findById(@PathVariable Integer id){
        Recipe recipe = this.iRecipeServices.findById(id);
        if (recipe==null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(recipe,HttpStatus.OK);
    }
}
