package com.javadock.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record Credentials(
        @Email(message = "{javadock.constraints.email.format.message}")
        String email,

        @Size(min = 8, max = 20, message = "{javadock.constraints.password.size.message}")
        String password
) {

}