package com.javadock.controllers;

import com.javadock.auth.TokenServiceImpl;
import com.javadock.requests.CreatePostRequest;
import com.javadock.requests.UpdatePostRequest;
import com.javadock.requests.UpdateUserRequest;
import com.javadock.responses.PostDetailResponse;
import com.javadock.responses.PostListResponse;
import com.javadock.services.PostService;
import com.javadock.validation.GenericMessage;
import com.javadock.validation.Messages;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.context.i18n.LocaleContextHolder;
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
    PostDetailResponse getPostById(@PathVariable Long id){
        return new PostDetailResponse(postService.getPostById(id));
    }

    @PostMapping
    public GenericMessage createPost(@Valid @RequestBody CreatePostRequest newPost){
        postService.createPost(newPost.toPost());
        String message = Messages.getMessageForLocale("javadock.create.post.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @PatchMapping("/{id}")
    public GenericMessage updatePostById(@PathVariable Long id,
                                         @Valid @RequestBody UpdatePostRequest updatePostRequest){
        postService.updatePostById(id, updatePostRequest);
        String message = Messages.getMessageForLocale("javadock.update.post.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @DeleteMapping("/{id}")
    public GenericMessage deletePostById(@PathVariable Long id){
        postService.deletePostById(id);
        String message = Messages.getMessageForLocale("javadock.delete.post.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }
}
