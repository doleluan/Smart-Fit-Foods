package com.example.backend.model.recipe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String content;
    private String imgs;
    private String videos;
    private Integer rate;
    @ManyToOne
    @JoinColumn(name = "type_recipe")
    private TypeRecipe typeRecipe;
    String status;
}
