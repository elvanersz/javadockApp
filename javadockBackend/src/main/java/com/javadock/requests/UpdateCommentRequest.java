package com.javadock.requests;

import jakarta.validation.constraints.NotBlank;

public record UpdateCommentRequest(

        @NotBlank(message = "javadock.constraints.content.NotBlank.message")
        String content
) {

}

