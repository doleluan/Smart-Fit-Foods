package com.example.backend.model.recipe;

import com.example.backend.model.food.FoodDetail;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class RecipeDetailId  implements Serializable {
    @ManyToOne
    @JoinColumn(name = "food_detail_id")
    private FoodDetail foodDetail;
    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

}
