package com.example.backend.services;

import com.example.backend.dto.PostDTO;
import com.example.backend.model.post.Post;
import javafx.geometry.Pos;

import java.util.List;

public interface IPostServices {
    List<Post> findAll();
    Post savePost(PostDTO postDTO);
    List<Post> getNewPost();
    Post findById(Integer id);
}
