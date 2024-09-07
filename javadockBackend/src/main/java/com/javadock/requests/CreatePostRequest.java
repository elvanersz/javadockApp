package com.javadock.requests;

import com.javadock.entities.Post;
import jakarta.validation.constraints.NotBlank;

public record CreatePostRequest(

        @NotBlank(message = "{javadock.constraints.content.NotBlank.message}")
        String content,

        @NotBlank(message = "{javadock.constraints.user.NotBlank.message}")
        Long userId
) {
    public Post toPost() {
        Post post = new Post();
        post.setContent(content);
        return post;
    }
}