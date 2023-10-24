package com.elvan.javadock.requests;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;

public record UpdateUserRequest(

        @NotBlank(message = "{javadock.constraints.firstName.NotBlank.message}")
        String firstName,

        @NotBlank(message = "{javadock.constraints.lastName.NotBlank.message}")
        String lastName,

        @NotBlank(message = "{javadock.constraints.username.NotBlank.message}")
        String username,

        @Nullable
        Long jobId,

        @Nullable
        Long universityId
) {

}
