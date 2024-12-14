package com.javadock.requests;

import com.javadock.entities.Post;
import com.javadock.entities.User;
import com.javadock.services.UserService;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreatePostRequest(

        @NotBlank(message = "javadock.constraints.header.NotBlank.message")
        String header,

        @NotBlank(message = "javadock.constraints.content.NotBlank.message")
        String content,

        @NotNull(message = "javadock.constraints.user.NotNull.message")
        Long userId
) {

    public Post toPost() {
        User user = new User(userId);

        Post post = new Post();
        post.setHeader(header);
        post.setContent(content);
        post.setUser(user);
        return post;
    }
}