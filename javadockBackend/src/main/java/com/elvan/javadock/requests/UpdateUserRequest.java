package com.elvan.javadock.requests;

import com.elvan.javadock.entities.Job;
import com.elvan.javadock.entities.University;
import com.elvan.javadock.validation.UniqueUsername;
import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;

public record UpdateUserRequest(

        @NotBlank(message = "{javadock.constraints.firstName.NotBlank.message}")
        String firstName,

        @NotBlank(message = "{javadock.constraints.lastName.NotBlank.message}")
        String lastName,

        @UniqueUsername //custom annotation
        @NotBlank(message = "{javadock.constraints.username.NotBlank.message}")
        @Column(name = "username")
        String username,

        @Nullable
        Job job,

        @Nullable
        University university
) {

}
