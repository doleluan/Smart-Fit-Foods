package com.example.backend.repository;

import com.example.backend.model.post.Post;
import com.example.backend.model.recipe.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IPostRepository extends JpaRepository<Post,Integer> {
    @Query(value = "select * from post order by id desc limit 6",nativeQuery = true)
    List<Post> getNewPost();
    @Query(value = "select * from post order by id desc",nativeQuery = true)
    List<Post> findAllDesc();

    @Query(value = "select * from post where name like concat('%',:name ,'%')",nativeQuery = true)
    Page<Post> findSearchPost(@Param("name") String name , Pageable pageable);
}
