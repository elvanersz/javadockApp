package com.javadock.controllers;

import com.javadock.auth.TokenServiceImpl;
import com.javadock.responses.PostDetailResponse;
import com.javadock.responses.PostListResponse;
import com.javadock.services.PostService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/posts")
public class PostController {

    private PostService postService;
    private TokenServiceImpl tokenServiceImpl;

    @GetMapping
    public Page<PostListResponse> getAllPosts(Pageable page, @RequestHeader(value = "Authorization", required = false) String authorizationHeader){
        var currentUser = tokenServiceImpl.verifyToken(authorizationHeader);
        return postService.getAllPosts(page, currentUser).map(PostListResponse::new);
    }

    @GetMapping("/{id}")
    PostDetailResponse getUserById(@PathVariable Long id) {
        return new PostDetailResponse(postService.getPostById(id));
    }
}
