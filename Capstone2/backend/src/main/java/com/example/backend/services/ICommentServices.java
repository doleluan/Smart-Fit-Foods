package com.example.backend.services;

import com.example.backend.dto.CommentDTO;
import com.example.backend.model.post.Comment;

import java.util.List;

public interface ICommentServices {
    List<Comment> findAll();
    Comment saveComment(CommentDTO commentDTO);
}
