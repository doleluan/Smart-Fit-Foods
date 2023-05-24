package com.example.backend.services;

import com.example.backend.dto.PostDTO;
import com.example.backend.model.post.Post;
import com.example.backend.model.recipe.Recipe;
import javafx.geometry.Pos;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IPostServices {
    List<Post> findAll();
    Post savePost(PostDTO postDTO);
    List<Post> getNewPost();
    Post findById(Integer id);
    Page<Post> findSearch(String name, Pageable pageable);
}
