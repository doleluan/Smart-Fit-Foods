package com.example.backend.services.Impl;

import com.example.backend.dto.PostDTO;
import com.example.backend.model.post.Post;
import com.example.backend.repository.IPostRepository;
import com.example.backend.services.IPostServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServices implements IPostServices {
    @Autowired
    private IPostRepository iPostRepository;
    @Override
    public List<Post> findAll() {
        return this.iPostRepository.findAllDesc();
    }

    @Override
    public Post savePost(PostDTO postDTO) {
        Post post = new Post(postDTO);
        return this.iPostRepository.save(post);
    }

    @Override
    public List<Post> getNewPost() {
        return this.iPostRepository.getNewPost();
    }

    @Override
    public Post findById(Integer id) {
        return this.iPostRepository.findById(id).orElse(null);
    }

    @Override
    public Page<Post> findSearch(String name, Pageable pageable) {
        return this.iPostRepository.findSearchPost(name,pageable);
    }
}
