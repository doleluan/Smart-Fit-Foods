package com.example.backend.controller;

import com.example.backend.dto.PostDTO;
import com.example.backend.model.post.Post;
import com.example.backend.model.recipe.Recipe;
import com.example.backend.services.IPostServices;
import javafx.geometry.Pos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
@CrossOrigin("http://localhost:4200/")
public class PostRestController {
    @Autowired
    private IPostServices iPostServices;
    @GetMapping("")
    private ResponseEntity<List<Post>> findAll(){
        return  new ResponseEntity<>(this.iPostServices.findAll(), HttpStatus.OK);
    }
    @PostMapping("/add")
    private ResponseEntity<Post> savePost(@RequestBody PostDTO postDTO) {
        return new ResponseEntity<>(this.iPostServices.savePost(postDTO),HttpStatus.OK);
    }
    @GetMapping("/newPost")
    private ResponseEntity<List<Post>> getNewPost(){
    return new ResponseEntity<>(this.iPostServices.getNewPost(),HttpStatus.OK);
    }
    @GetMapping("/getPost/{id}")
    private ResponseEntity<Post> findById(@PathVariable Integer id){
        Post post = this.iPostServices.findById(id);
        if (post==null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(post,HttpStatus.OK);
    }
}
