package com.javadock.requests;

import com.javadock.entities.Comment;
import com.javadock.entities.Post;
import com.javadock.entities.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateCommentRequest(

        @NotBlank(message = "javadock.constraints.content.NotBlank.message")
        String content,

        @NotNull(message = "javadock.constraints.user.NotNull.message")
        Long userId,

        @NotNull(message = "javadock.constraints.user.NotNull.message")
        Long postId
) {

    public Comment toComment() {
        User user = new User(userId);
        Post post = new Post(postId);

        Comment comment = new Comment();
        comment.setContent(content);
        comment.setUser(user);
        comment.setPost(post);
        return comment;
    }
}