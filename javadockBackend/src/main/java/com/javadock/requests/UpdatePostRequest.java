package com.javadock.requests;

import jakarta.validation.constraints.NotBlank;

public record UpdatePostRequest(
        @NotBlank(message = "javadock.constraints.header.NotBlank.message")
        String header,

        @NotBlank(message = "javadock.constraints.content.NotBlank.message")
        String content
) {

}
