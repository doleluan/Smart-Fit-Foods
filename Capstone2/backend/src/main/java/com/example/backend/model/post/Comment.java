package com.example.backend.model.post;

import com.example.backend.dto.CommentDTO;
import com.example.backend.model.person.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javafx.geometry.Pos;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String content;
    private String time;
    @ManyToOne()
    @JoinColumn(name="post_id")
    @JsonIgnore
    private Post post;
    @ManyToOne
    @JoinColumn(name="person")
    private Users users;
    public Comment(CommentDTO commentDTO){
        this.content = commentDTO.getContent();
        this.time = commentDTO.getTime();
        Post post = new Post();
        post.setId(commentDTO.getPost());
        this.post = post;
        Users  users = new Users();
        users.setId(commentDTO.getUser());
        this.users = users;
    }
}
