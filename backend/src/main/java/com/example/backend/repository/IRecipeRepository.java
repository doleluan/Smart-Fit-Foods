package com.example.backend.repository;

import com.example.backend.model.recipe.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface IRecipeRepository extends JpaRepository<Recipe,Integer> {
    @Query(value = "select * from recipe where name like concat('%',:name ,'%')",nativeQuery = true)
    Page<Recipe> findAllRecipes(@Param("name") String name , Pageable pageable);
    @Query(value = "select * from recipe where name like concat('%',:name ,'%')",nativeQuery = true)
    List<Recipe> searchRecipe(@Param("name") String name);
}
