package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommentDTO {
    private String content;
    private String time;
    private Integer post;
    private Integer user;
}
