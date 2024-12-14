package com.javadock.requests;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateUserRequest(

        @NotBlank(message = "javadock.constraints.firstName.NotBlank.message")
        String firstName,

        @NotBlank(message = "javadock.constraints.lastName.NotBlank.message")
        String lastName,

        @NotBlank(message = "javadock.constraints.username.NotBlank.message")
        @Size(max = 20, message = "javadock.constraints.username.max.size.message")
        String username,

        @Nullable
        String job,

        @Nullable
        String university
) {

}
