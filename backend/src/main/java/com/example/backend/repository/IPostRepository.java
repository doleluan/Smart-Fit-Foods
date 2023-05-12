package com.example.backend.repository;

import com.example.backend.model.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IPostRepository extends JpaRepository<Post,Integer> {
    @Query(value = "select * from post order by id desc limit 6",nativeQuery = true)
    List<Post> getNewPost();
    @Query(value = "select * from post order by id desc",nativeQuery = true)
    List<Post> findAllDesc();
}
